"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Check, Trash2, Edit2, X } from 'lucide-react';
import { Task } from '../../types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(task.id, editText.trim());
      setIsEditing(false);
    } else {
      // If empty, revert or delete? Let's revert.
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  return (
    <div 
      className={`group relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
        task.completed 
          ? 'bg-zinc-900/40 border-zinc-800/50' 
          : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 hover:shadow-lg hover:shadow-white/5'
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
          task.completed
            ? 'bg-zinc-500 border-zinc-500 scale-110'
            : 'border-zinc-600 hover:border-white'
        }`}
      >
        {task.completed && <Check size={14} className="text-black" />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSave}
              className="w-full bg-black text-white px-2 py-1 rounded border border-zinc-700 outline-none focus:ring-1 focus:ring-white"
            />
          </div>
        ) : (
          <span 
            className={`block truncate text-lg transition-all duration-300 ${
              task.completed 
                ? 'text-zinc-600 line-through decoration-zinc-700' 
                : 'text-zinc-100'
            }`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {task.text}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {!isEditing && !task.completed && (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-zinc-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit2 size={18} />
          </button>
        )}
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
          title="Delete"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};
