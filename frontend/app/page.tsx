"use client";

import React from 'react';
import { useTasks } from '../hooks/useTasks';
import { TaskInput } from '../components/ui/TaskInput';
import { TaskItem } from '../components/ui/TaskItem';
import { FilterBar } from '../components/ui/FilterBar';
import { CheckCircle2, ListTodo } from 'lucide-react';

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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] translate-y-1/2" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 py-12 md:py-20 flex flex-col gap-8 min-h-screen">
        
        {/* Header */}
        <header className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
            <CheckCircle2 size={16} />
            <span>Stay Organized</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight">
            TaskFlow
          </h1>
          <p className="text-slate-400 text-lg max-w-lg">
            Capture your ideas, organize your life, and achieve more every day.
          </p>
        </header>

        {/* Main App Area */}
        <main className="space-y-8">
          <TaskInput onAdd={addTask} />

          <div className="space-y-4">
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
                <div className="flex flex-col items-center justify-center py-20 text-slate-500 border-2 border-dashed border-slate-800 rounded-2xl bg-slate-900/20">
                  <ListTodo size={48} className="mb-4 opacity-50" />
                  <p className="text-lg font-medium">No tasks found</p>
                  <p className="text-sm">
                    {filter === 'all' 
                      ? "Start by adding a new task above" 
                      : `No ${filter} tasks available`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto pt-8 text-center text-slate-600 text-sm">
          <p>Double-click a task to edit • Data saved locally</p>
        </footer>
      </div>
    </div>
  );
}

