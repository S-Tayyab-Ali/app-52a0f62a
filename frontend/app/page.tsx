"use client";

import React from 'react';
import { useTasks } from '../hooks/useTasks';
import { TaskInput } from '../components/ui/TaskInput';
import { TaskItem } from '../components/ui/TaskItem';
import { FilterBar } from '../components/ui/FilterBar';
import { Rocket, ListTodo } from 'lucide-react';

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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-yellow-400 selection:bg-yellow-400/30 font-mono">
      {/* Starfield Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[2px] h-[2px] bg-white top-10 left-20 shadow-[0_0_4px_2px_white] animate-pulse" />
        <div className="absolute w-[3px] h-[3px] bg-white top-1/4 left-3/4 shadow-[0_0_4px_2px_white] animate-pulse delay-700" />
        <div className="absolute w-[2px] h-[2px] bg-white bottom-1/3 right-10 shadow-[0_0_4px_2px_white] animate-pulse delay-300" />
        {/* Random stars generated via CSS would be better, but manual placement for MVP */}
        {[...Array(50)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full opacity-70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: Math.random() > 0.9 ? '3px' : '1px',
              height: Math.random() > 0.9 ? '3px' : '1px',
              animation: `twinkle ${Math.random() * 5 + 2}s infinite`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-3xl mx-auto px-4 py-12 md:py-20 flex flex-col gap-8 min-h-screen">
        
        {/* Header */}
        <header className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-yellow-400/30 text-yellow-400 text-xs tracking-widest uppercase mb-4 bg-yellow-400/5">
            <Rocket size={14} />
            <span>Galactic Standard Time</span>
          </div>
          
          <div className="perspective-1000">
            <h1 className="text-5xl md:text-7xl font-bold text-yellow-400 tracking-widest uppercase drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">
              Task Wars
            </h1>
          </div>
          
          <p className="text-cyan-400 text-lg max-w-lg mx-auto tracking-wider">
            Episode IV: A New List
          </p>
        </header>

        {/* Main App Area */}
        <main className="space-y-8 relative z-10">
          <TaskInput onAdd={addTask} />

          <div className="space-y-4 bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 backdrop-blur-sm">
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

            <div className="space-y-3 min-h-[200px]">
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
                <div className="flex flex-col items-center justify-center py-20 text-zinc-600 border-2 border-dashed border-zinc-800 rounded-xl bg-black/40">
                  <ListTodo size={48} className="mb-4 opacity-50 text-yellow-400" />
                  <p className="text-lg font-medium text-yellow-400/80">No missions found</p>
                  <p className="text-sm text-cyan-400/60">
                    {filter === 'all' 
                      ? "Transmit a new objective above" 
                      : `No ${filter} objectives in the database`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto pt-8 text-center text-zinc-600 text-xs tracking-widest uppercase">
          <p>May the Force be with your productivity</p>
        </footer>
      </div>
      
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

