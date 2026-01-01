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
  const filters: { id: FilterType; label: string; color: string }[] = [
    { id: 'all', label: 'ALL', color: 'bg-blue-500' },
    { id: 'active', label: 'WILD', color: 'bg-green-500' },
    { id: 'completed', label: 'CAUGHT', color: 'bg-red-500' },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
      <div className="flex gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`relative px-3 py-1 rounded shadow-md border-b-4 active:border-b-0 active:translate-y-1 transition-all duration-100 text-xs font-bold text-white uppercase tracking-wider ${
              currentFilter === filter.id
                ? `${filter.color} border-black/30 brightness-110`
                : 'bg-zinc-500 border-zinc-700 hover:bg-zinc-400'
            }`}
          >
            <span className="flex items-center gap-2">
              {filter.label}
              <span className="bg-black/20 px-1.5 rounded text-[10px]">
                {filter.id === 'all' ? counts.all : filter.id === 'active' ? counts.active : counts.completed}
              </span>
            </span>
          </button>
        ))}
      </div>

      {counts.completed > 0 && (
        <button
          onClick={onClearCompleted}
          className="text-xs font-bold text-[#2d4d2d] hover:text-red-600 underline decoration-2 underline-offset-2 uppercase tracking-wide"
        >
          Release Caught
        </button>
      )}
    </div>
  );
};

