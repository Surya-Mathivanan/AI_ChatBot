import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { useConversationStore } from '../store/conversation'

export default function Chat() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')

  const {
    conversations,
    currentConversation,
    messages,
    fetchConversations,
    loadConversation,
    renameConversation,
    deleteConversation,
    sendMessage,
    clearCurrentConversation
  } = useConversationStore()

  useEffect(() => {
    fetchConversations()
  }, [fetchConversations])

  const send = async () => {
    if (!input.trim() || loading) return
    
    setLoading(true)
    try {
      await sendMessage(input)
      setInput('')
    } catch (error: any) {
      console.error('Chat API error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleNewChat = () => {
    clearCurrentConversation()
    setShowSidebar(false)
  }

  const handleSelectConversation = (id: string) => {
    loadConversation(id)
    setShowSidebar(false)
  }

  const handleRename = async (id: string) => {
    if (!editTitle.trim()) return
    try {
      await renameConversation(id, editTitle)
      setEditingId(null)
      setEditTitle('')
    } catch (error) {
      console.error('Failed to rename:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this conversation?')) {
      try {
        await deleteConversation(id)
      } catch (error) {
        console.error('Failed to delete:', error)
      }
    }
  }

  return (
    <div className="full-bleed" style={{ display: 'flex', height: 'calc(100vh - 80px)' }}>
      {/* Sidebar */}
      <div className={`chat-sidebar ${showSidebar ? 'show' : ''}`} style={{
        width: showSidebar ? '280px' : '0',
        minWidth: showSidebar ? '280px' : '0',
        borderRight: showSidebar ? '1px solid #e0e0e0' : 'none',
        overflowY: 'auto',
        transition: 'all 0.3s ease',
        padding: showSidebar ? '16px' : '0'
      }}>
        <button className="btn" onClick={handleNewChat} style={{ width: '100%', marginBottom: '16px' }}>
          + New Chat
        </button>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {conversations.map(conv => (
            <div key={conv.id} style={{
              padding: '12px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: currentConversation?.id === conv.id ? '#f0f0f0' : 'white'
            }}>
              {editingId === conv.id ? (
                <div onClick={(e) => e.stopPropagation()}>
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleRename(conv.id)}
                    style={{ width: '100%', marginBottom: '8px' }}
                    autoFocus
                  />
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button onClick={() => handleRename(conv.id)} style={{ fontSize: '12px' }}>Save</button>
                    <button onClick={() => setEditingId(null)} style={{ fontSize: '12px' }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div onClick={() => handleSelectConversation(conv.id)} style={{ marginBottom: '8px' }}>
                    <strong>{conv.title}</strong>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '12px' }}>
                    <button onClick={(e) => {
                      e.stopPropagation()
                      setEditingId(conv.id)
                      setEditTitle(conv.title)
                    }}>Rename</button>
                    <button onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(conv.id)
                    }}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="card chat-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3>{currentConversation?.title || 'AI Assistant'}</h3>
            <button onClick={() => setShowSidebar(!showSidebar)} className="btn">
              {showSidebar ? 'Hide' : 'Show'} History
            </button>
          </div>
          
          <div className="chat" style={{ flex: 1, overflowY: 'auto' }}>
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
          
          <div className="row" style={{ marginTop: '16px' }}>
            <input 
              className="input flex" 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey ? send() : undefined} 
              placeholder="Ask anything..." 
            />
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
          <p className="muted" style={{marginTop: 8}}>
            Note: When sending the first message, it may take a little longer because the server needs to start.
          </p>
        </div>
      </div>
    </div>
  )
}


