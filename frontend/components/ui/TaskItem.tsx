"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Trash2, Edit2 } from 'lucide-react';
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
      className={`group relative flex items-center gap-3 p-3 rounded border-2 transition-all duration-200 ${
        task.completed 
          ? 'bg-[#8bac8b]/50 border-[#5a7a5a]/30 opacity-70' 
          : 'bg-[#e0f0e0] border-[#5a7a5a] shadow-sm hover:translate-x-1'
      }`}
    >
      {/* Pokeball Checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        className="flex-shrink-0 w-8 h-8 relative group/btn"
        title={task.completed ? "Mark as active" : "Mark as captured"}
      >
        <div className={`w-full h-full rounded-full border-2 border-black overflow-hidden transition-all duration-300 ${
          task.completed ? 'grayscale opacity-50' : 'rotate-0 group-hover/btn:rotate-12'
        }`}>
          <div className="absolute top-0 left-0 w-full h-1/2 bg-red-500 border-b-2 border-black" />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-black z-10">
            {task.completed && <div className="absolute inset-0 bg-red-500 rounded-full scale-50" />}
          </div>
        </div>
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0 font-mono">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className="w-full bg-[#8bac8b] text-[#2d4d2d] px-2 py-1 rounded border border-[#5a7a5a] outline-none font-bold"
          />
        ) : (
          <span 
            className={`block truncate text-lg font-bold tracking-tight transition-all duration-300 ${
              task.completed 
                ? 'text-[#5a7a5a] line-through' 
                : 'text-[#2d4d2d]'
            }`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {task.text}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {!isEditing && !task.completed && (
          <button
            onClick={() => setIsEditing(true)}
            className="p-1.5 text-[#2d4d2d] hover:bg-[#8bac8b] rounded transition-colors"
            title="Edit"
          >
            <Edit2 size={16} />
          </button>
        )}
        <button
          onClick={() => onDelete(task.id)}
          className="p-1.5 text-[#2d4d2d] hover:text-red-600 hover:bg-red-100 rounded transition-colors"
          title="Release"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

