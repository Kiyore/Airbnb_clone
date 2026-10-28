import React, { useState } from 'react';
import { X, Copy, Check, MessageCircle, Mail, Send } from 'lucide-react';

export default function ShareModal({ isOpen, onClose, title, photoUrl }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 transition"
          aria-label="Close share dialog"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        <h3 className="text-xl font-bold text-[#222222] mb-4">
          Share this place
        </h3>

        {/* Property Preview Card */}
        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl mb-6 border border-gray-200">
          <img
            src={photoUrl}
            alt={title}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <h4 className="font-semibold text-sm text-[#222222] line-clamp-1">
              {title}
            </h4>
            <p className="text-xs text-[#717171] mt-0.5">
              Entire serviced apartment in Candolim, Goa
            </p>
          </div>
        </div>

        {/* Share buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-300 font-semibold text-sm hover:bg-gray-50 transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
          </button>

          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-300 font-semibold text-sm hover:bg-gray-50 transition"
          >
            <MessageCircle className="w-4 h-4 text-green-600" />
            <span>WhatsApp</span>
          </a>

          <a
            href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(window.location.href)}`}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-300 font-semibold text-sm hover:bg-gray-50 transition"
          >
            <Mail className="w-4 h-4 text-blue-600" />
            <span>Email</span>
          </a>

          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-300 font-semibold text-sm hover:bg-gray-50 transition"
          >
            <Send className="w-4 h-4 text-sky-500" />
            <span>X (Twitter)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
