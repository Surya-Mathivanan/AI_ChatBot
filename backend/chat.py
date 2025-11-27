from flask import Blueprint, request, jsonify, session
from models import Chat, Message
from database import db
from auth import login_required
import google.generativeai as genai
import os
from datetime import datetime

chat_bp = Blueprint('chat', __name__)

GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

@chat_bp.route('/chats', methods=['GET'])
@login_required
def get_chats():
    user_id = session['user_id']
    chats = Chat.query.filter_by(user_id=user_id).order_by(Chat.updated_at.desc()).all()
    return jsonify({'chats': [chat.to_dict() for chat in chats]}), 200

@chat_bp.route('/chats', methods=['POST'])
@login_required
def create_chat():
    user_id = session['user_id']
    data = request.get_json()
    title = data.get('title', 'New Chat')
    
    chat = Chat(user_id=user_id, title=title)
    db.session.add(chat)
    db.session.commit()
    
    return jsonify({'chat': chat.to_dict()}), 201

@chat_bp.route('/chats/<int:chat_id>', methods=['GET'])
@login_required
def get_chat(chat_id):
    user_id = session['user_id']
    chat = Chat.query.filter_by(id=chat_id, user_id=user_id).first()
    
    if not chat:
        return jsonify({'error': 'Chat not found'}), 404
    
    return jsonify({'chat': chat.to_dict(include_messages=True)}), 200

@chat_bp.route('/chats/<int:chat_id>', methods=['PUT'])
@login_required
def update_chat(chat_id):
    user_id = session['user_id']
    chat = Chat.query.filter_by(id=chat_id, user_id=user_id).first()
    
    if not chat:
        return jsonify({'error': 'Chat not found'}), 404
    
    data = request.get_json()
    if 'title' in data:
        chat.title = data['title']
        chat.updated_at = datetime.utcnow()
        db.session.commit()
    
    return jsonify({'chat': chat.to_dict()}), 200

@chat_bp.route('/chats/<int:chat_id>', methods=['DELETE'])
@login_required
def delete_chat(chat_id):
    user_id = session['user_id']
    chat = Chat.query.filter_by(id=chat_id, user_id=user_id).first()
    
    if not chat:
        return jsonify({'error': 'Chat not found'}), 404
    
    db.session.delete(chat)
    db.session.commit()
    
    return jsonify({'success': True}), 200

@chat_bp.route('/chats/<int:chat_id>/messages', methods=['POST'])
@login_required
def send_message(chat_id):
    user_id = session['user_id']
    chat = Chat.query.filter_by(id=chat_id, user_id=user_id).first()
    
    if not chat:
        return jsonify({'error': 'Chat not found'}), 404
    
    data = request.get_json()
    user_message = data.get('message', '').strip()
    
    if not user_message:
        return jsonify({'error': 'Message cannot be empty'}), 400
    
    user_msg = Message(chat_id=chat_id, role='user', content=user_message)
    db.session.add(user_msg)
    
    try:
        if not GEMINI_API_KEY:
            ai_response = "Gemini API key is not configured. Please set the GEMINI_API_KEY environment variable."
        else:
            try:
                model = genai.GenerativeModel('gemini-2.5-flash')
                response = model.generate_content(user_message)
                ai_response = response.text
            except Exception as gemini_error:
                print(f"Gemini API error: {str(gemini_error)}")
                ai_response = f"Error generating AI response: {str(gemini_error)}"
        
        ai_msg = Message(chat_id=chat_id, role='model', content=ai_response)
        db.session.add(ai_msg)
        
        chat.updated_at = datetime.utcnow()
        if chat.title == 'New Chat' and len(chat.messages) == 0:
            chat.title = user_message[:50] + ('...' if len(user_message) > 50 else '')
        
        db.session.commit()
        
        return jsonify({
            'user_message': user_msg.to_dict(),
            'ai_message': ai_msg.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to generate response: {str(e)}'}), 500
