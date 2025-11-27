import { create } from 'zustand'
import api from '../api/client'

export interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  created_at: string
}

export interface Conversation {
  id: string
  title: string
  created_at: string
  updated_at: string
}

interface ConversationState {
  conversations: Conversation[]
  currentConversation: Conversation | null
  messages: Message[]
  isLoading: boolean
  
  // Actions
  fetchConversations: () => Promise<void>
  createConversation: (title?: string) => Promise<Conversation>
  loadConversation: (conversationId: string) => Promise<void>
  renameConversation: (conversationId: string, newTitle: string) => Promise<void>
  deleteConversation: (conversationId: string) => Promise<void>
  sendMessage: (message: string, conversationId?: string) => Promise<string>
  clearCurrentConversation: () => void
}

export const useConversationStore = create<ConversationState>((set, get) => ({
  conversations: [],
  currentConversation: null,
  messages: [],
  isLoading: false,

  async fetchConversations() {
    try {
      const { data } = await api.get('/api/conversations')
      set({ conversations: data.conversations })
    } catch (error) {
      console.error('Failed to fetch conversations:', error)
    }
  },

  async createConversation(title = 'New Chat') {
    try {
      const { data } = await api.post('/api/conversations', { title })
      const newConversation = data.conversation
      set(state => ({
        conversations: [newConversation, ...state.conversations],
        currentConversation: newConversation,
        messages: []
      }))
      return newConversation
    } catch (error) {
      console.error('Failed to create conversation:', error)
      throw error
    }
  },

  async loadConversation(conversationId: string) {
    try {
      set({ isLoading: true })
      const { data } = await api.get(`/api/conversations/${conversationId}`)
      set({
        currentConversation: data.conversation,
        messages: data.messages,
        isLoading: false
      })
    } catch (error) {
      console.error('Failed to load conversation:', error)
      set({ isLoading: false })
    }
  },

  async renameConversation(conversationId: string, newTitle: string) {
    try {
      await api.put(`/api/conversations/${conversationId}`, { title: newTitle })
      set(state => ({
        conversations: state.conversations.map(conv =>
          conv.id === conversationId ? { ...conv, title: newTitle } : conv
        ),
        currentConversation: state.currentConversation?.id === conversationId
          ? { ...state.currentConversation, title: newTitle }
          : state.currentConversation
      }))
    } catch (error) {
      console.error('Failed to rename conversation:', error)
      throw error
    }
  },

  async deleteConversation(conversationId: string) {
    try {
      await api.delete(`/api/conversations/${conversationId}`)
      set(state => ({
        conversations: state.conversations.filter(conv => conv.id !== conversationId),
        currentConversation: state.currentConversation?.id === conversationId
          ? null
          : state.currentConversation,
        messages: state.currentConversation?.id === conversationId ? [] : state.messages
      }))
    } catch (error) {
      console.error('Failed to delete conversation:', error)
      throw error
    }
  },

  async sendMessage(message: string, conversationId?: string) {
    try {
      const { data } = await api.post('/api/chat', {
        message,
        conversation_id: conversationId || get().currentConversation?.id || ''
      })
      
      // If new conversation was created, update state
      if (!conversationId && !get().currentConversation) {
        await get().fetchConversations()
        if (data.conversation_id) {
          await get().loadConversation(data.conversation_id)
        }
      } else {
        // Add messages to current conversation
        const userMessage: Message = {
          id: Date.now(),
          role: 'user',
          content: message,
          created_at: new Date().toISOString()
        }
        const assistantMessage: Message = {
          id: Date.now() + 1,
          role: 'assistant',
          content: data.answer,
          created_at: new Date().toISOString()
        }
        set(state => ({
          messages: [...state.messages, userMessage, assistantMessage]
        }))
      }
      
      return data.answer
    } catch (error) {
      console.error('Failed to send message:', error)
      throw error
    }
  },

  clearCurrentConversation() {
    set({ currentConversation: null, messages: [] })
  }
}))
