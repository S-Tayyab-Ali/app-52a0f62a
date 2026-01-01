"use client";

import React from 'react';
import { useTasks } from '../hooks/useTasks';
import { TaskInput } from '../components/ui/TaskInput';
import { TaskItem } from '../components/ui/TaskItem';
import { FilterBar } from '../components/ui/FilterBar';
import { CircleDot, ListTodo } from 'lucide-react';

export default function Home() {
  const { 
    tasks, 
    addTask, 
    toggleTask, 
    deleteTask, 
    editTask, 
    clearCompleted, 
    filter, 
    setFilter, 
    stats,
    isLoaded 
  } = useTasks();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-red-600 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-8 border-white border-t-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-600 font-sans selection:bg-yellow-400 selection:text-black overflow-hidden relative">
      {/* Pokedex Background Elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-red-700 border-b-4 border-red-800 shadow-lg z-10">
        {/* Big Blue Light */}
        <div className="absolute top-4 left-4 w-16 h-16 bg-blue-400 rounded-full border-4 border-white shadow-[0_0_10px_rgba(59,130,246,0.5)] overflow-hidden">
          <div className="absolute top-2 left-2 w-4 h-4 bg-white/50 rounded-full blur-[2px]" />
        </div>
        {/* Small Lights */}
        <div className="absolute top-4 left-24 flex gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full border border-red-800 shadow-inner" />
          <div className="w-4 h-4 bg-yellow-400 rounded-full border border-yellow-600 shadow-inner" />
          <div className="w-4 h-4 bg-green-500 rounded-full border border-green-700 shadow-inner" />
        </div>
      </div>

      <div className="relative max-w-3xl mx-auto px-4 pt-32 pb-12 flex flex-col gap-6 min-h-screen">
        
        {/* Main Screen Container */}
        <div className="bg-zinc-200 rounded-b-3xl rounded-tr-3xl rounded-tl-[50px] p-6 md:p-8 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] border-4 border-zinc-300 relative">
          
          {/* Screen Header */}
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-800 tracking-tight flex items-center gap-3">
                <span className="text-red-600">Task</span>Dex
              </h1>
              <p className="text-zinc-500 font-medium mt-1">
                Gotta complete 'em all!
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 opacity-20">
                <svg viewBox="0 0 100 100" className="fill-current text-black">
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="8" fill="none" />
                  <path d="M 5 50 L 95 50" stroke="currentColor" strokeWidth="8" />
                  <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="8" fill="white" />
                  <circle cx="50" cy="50" r="5" fill="currentColor" />
                </svg>
              </div>
            </div>
          </header>

          {/* Inner Screen (Greenish) */}
          <div className="bg-[#98cb98] rounded-xl border-4 border-zinc-400 p-4 shadow-inner relative overflow-hidden min-h-[500px] flex flex-col">
            {/* Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_4px,6px_100%]" />
            
            <div className="relative z-10 flex flex-col gap-6 h-full">
              <TaskInput onAdd={addTask} />

              <div className="flex-1 flex flex-col gap-4">
                <FilterBar 
                  currentFilter={filter} 
                  onFilterChange={setFilter} 
                  counts={{
                    all: stats.total,
                    active: stats.active,
                    completed: stats.completed
                  }}
                  onClearCompleted={clearCompleted}
                />

                <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
                  {tasks.length > 0 ? (
                    tasks.map((task) => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                        onEdit={editTask}
                      />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-zinc-700/60">
                      <div className="w-16 h-16 mb-4 opacity-50">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M2 12h20" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </div>
                      <p className="text-lg font-bold font-mono">NO DATA FOUND</p>
                      <p className="text-sm font-mono">
                        {filter === 'all' 
                          ? "ADD NEW ENTRY" 
                          : `NO ${filter.toUpperCase()} ENTRIES`}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Controls Decoration */}
          <div className="mt-6 flex justify-between items-center px-4">
            <div className="w-8 h-8 bg-zinc-800 rounded-full shadow-lg" />
            <div className="flex gap-4">
              <div className="w-24 h-3 bg-red-500 rounded-full shadow-inner border border-red-600" />
              <div className="w-24 h-3 bg-blue-500 rounded-full shadow-inner border border-blue-600" />
            </div>
            <div className="grid grid-cols-3 gap-1">
              <div className="w-0 h-0" />
              <div className="w-6 h-6 bg-zinc-800 rounded-t-md shadow-md" />
              <div className="w-0 h-0" />
              <div className="w-6 h-6 bg-zinc-800 rounded-l-md shadow-md" />
              <div className="w-6 h-6 bg-zinc-900 rounded-sm" />
              <div className="w-6 h-6 bg-zinc-800 rounded-r-md shadow-md" />
              <div className="w-0 h-0" />
              <div className="w-6 h-6 bg-zinc-800 rounded-b-md shadow-md" />
              <div className="w-0 h-0" />
            </div>
          </div>

        </div>
      </div>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
}

