"use client";

import React, { useState } from 'react';
import { Plus } from 'lucide-react';

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
    <form onSubmit={handleSubmit} className="w-full relative group">
      <div className="absolute -inset-0.5 bg-cyan-500/20 rounded-lg opacity-50 group-hover:opacity-100 transition duration-500 blur-sm"></div>
      <div className="relative flex items-center bg-black border border-cyan-500/50 rounded-lg p-1 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
        <div className="pl-4 pr-2 text-cyan-500/50 font-mono text-xs select-none">
          CMD:
        </div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter mission objective..."
          className="flex-1 bg-transparent border-none outline-none text-cyan-400 placeholder-cyan-900/50 px-2 py-3 text-lg font-mono tracking-wide"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="p-3 rounded bg-cyan-900/30 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-cyan-400"
        >
          <Plus size={20} />
        </button>
      </div>
    </form>
  );
};

