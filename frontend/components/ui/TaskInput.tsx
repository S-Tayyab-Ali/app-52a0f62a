"use client";

import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface TaskInputProps {
  onAdd: (text: string) => void;
}

export const TaskInput: React.FC<TaskInputProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center bg-[#8bac8b] border-2 border-[#5a7a5a] rounded-lg shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]">
        <div className="pl-3 text-[#2d4d2d]">
          <Search size={20} strokeWidth={3} />
        </div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Register new task..."
          className="flex-1 bg-transparent border-none outline-none text-[#2d4d2d] placeholder-[#2d4d2d]/50 px-3 py-3 text-lg font-mono font-bold tracking-tight"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="mr-2 px-4 py-1.5 bg-yellow-400 border-2 border-yellow-600 rounded text-yellow-900 font-bold text-sm uppercase tracking-wider hover:bg-yellow-300 active:translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0"
        >
          Add
        </button>
      </div>
    </form>
  );
};

