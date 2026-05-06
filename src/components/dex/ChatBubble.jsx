import React from 'react';

export default function ChatBubble({ from = 'dex', children }) {
  const isUser = from === 'user';
  return (
    <div className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'} animate-floatUp`}>
      <div
        className={[
          'max-w-[82%] px-4 py-3 text-[14px] leading-snug',
          isUser
            ? 'bg-violet-grad text-white rounded-3xl rounded-br-md shadow-[0_6px_20px_rgba(124,58,237,0.45)]'
            : 'bg-card text-white rounded-3xl rounded-bl-md ring-1 ring-white/5',
        ].join(' ')}
      >
        {children}
      </div>
    </div>
  );
}
