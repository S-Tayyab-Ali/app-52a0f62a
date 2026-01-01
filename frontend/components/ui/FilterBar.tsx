"use client";

import React from 'react';
import { FilterType } from '../../types/task';

interface FilterBarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
  onClearCompleted: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ 
  currentFilter, 
  onFilterChange, 
  counts,
  onClearCompleted 
}) => {
  const filters: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
      <div className="flex p-1 bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-xl">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
              currentFilter === filter.id
                ? 'text-white font-medium'
                : 'hover:text-slate-200'
            }`}
          >
            {currentFilter === filter.id && (
              <div className="absolute inset-0 bg-white/10 rounded-lg shadow-sm" />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {filter.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                currentFilter === filter.id ? 'bg-white/20' : 'bg-slate-800'
              }`}>
                {filter.id === 'all' ? counts.all : filter.id === 'active' ? counts.active : counts.completed}
              </span>
            </span>
          </button>
        ))}
      </div>

      {counts.completed > 0 && (
        <button
          onClick={onClearCompleted}
          className="text-slate-400 hover:text-red-400 transition-colors text-sm font-medium px-4 py-2 hover:bg-red-400/10 rounded-lg"
        >
          Clear Completed
        </button>
      )}
    </div>
  );
};

