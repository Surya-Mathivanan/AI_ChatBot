import { useState } from 'react'
import api from '../api/client'
import ReactMarkdown from 'react-markdown'

interface Message { role: 'user' | 'assistant'; content: string }

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const send = async () => {
    if (!input.trim()) return
    const userMsg: Message = { role: 'user', content: input }
    setMessages(m => [...m, userMsg])
    setInput('')
    setLoading(true)
    try {
      const { data } = await api.post('/api/chat', { message: userMsg.content })
      setMessages(m => [...m, { role: 'assistant', content: data.answer }])
    } catch (error) {
      setMessages(m => [...m, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="full-bleed">
      <div className="card chat-card">
        <h3>AI Assistant</h3>
        <div className="chat">
          {messages.map((m, i) => (
            <div key={i} className={`bubble ${m.role}`}>
              {m.role === 'assistant' ? <ReactMarkdown>{m.content}</ReactMarkdown> : m.content}
            </div>
          ))}
          {loading && (
            <div className="bubble assistant">
              <div className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>
        <div className="row">
          <input className="input flex" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' ? send() : undefined} placeholder="Ask anything..." />
          <button className="btn" onClick={send} disabled={loading}>
            {loading ? (
              <>
                <div className="loading-spinner"></div>
                Sending...
              </>
            ) : (
              'Send'
            )}
          </button>
        </div>
        <p className="muted" style={{marginTop:8}}>Note: When sending the first message, it may take a little longer because the server needs to start.</p>
      </div>
    </div>
  )
}


