import React, { useState, useEffect } from 'react';
import { X, Trash2, CheckCircle, Clock, RefreshCw } from 'lucide-react';

export default function AdminInboxModal({ isOpen, onClose, onRefresh }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      if (res.ok) {
        setMessages(data.messages || []);
      } else {
        throw new Error(data.error || 'Failed to fetch messages');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (onRefresh) onRefresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      const res = await fetch(`/api/messages/${id}/read`, { method: 'PATCH' });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, read: true } : m))
        );
        if (onRefresh) onRefresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isOpen) fetchMessages();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-[#f7f6f0] border-3 border-zinc-900 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-[8px_8px_0px_#111] z-10 p-6 sm:p-8">
        {/* Tape decor */}
        <div className="tape-strip -top-3 left-1/2 -translate-x-1/2"></div>

        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-dashed border-zinc-300">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
              ✉
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-zinc-900">Contact Messages Inbox</h3>
              <p className="text-xs font-mono text-zinc-500">
                {messages.length} pesan · {messages.filter(m => !m.read).length} belum dibaca
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchMessages}
              disabled={loading}
              className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200 rounded transition-colors"
              title="Refresh messages"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white border border-zinc-900 flex items-center justify-center text-zinc-800 hover:bg-zinc-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        {loading && messages.length === 0 ? (
          <div className="py-12 text-center text-zinc-500 font-mono text-xs">
            Loading messages...
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 border border-red-300 text-red-700 text-xs rounded-lg">
            {error}
          </div>
        ) : messages.length === 0 ? (
          <div className="py-12 text-center text-zinc-500 font-hand text-2xl">
            No messages yet! Try sending one from the contact form below ✉️
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-4 rounded-xl border-2 transition-all ${
                  msg.read
                    ? 'bg-white/80 border-zinc-200'
                    : 'bg-yellow-50/90 border-zinc-900 shadow-[3px_3px_0px_#111]'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-zinc-900 text-sm">{msg.name}</span>
                      {!msg.read && (
                        <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase">
                          New
                        </span>
                      )}
                    </div>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-xs text-blue-600 hover:underline font-mono"
                    >
                      {msg.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(msg.timestamp).toLocaleDateString('id-ID')}
                    </span>
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="p-1 text-zinc-400 hover:text-red-600 transition-colors ml-1"
                      title="Delete message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-zinc-700 text-sm whitespace-pre-wrap bg-white/60 p-3 rounded-lg border border-zinc-200 font-sans">
                  {msg.message}
                </p>

                {!msg.read && (
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => handleMarkRead(msg.id)}
                      className="text-xs font-mono font-bold text-zinc-700 hover:text-zinc-950 flex items-center gap-1"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      Mark as read
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
