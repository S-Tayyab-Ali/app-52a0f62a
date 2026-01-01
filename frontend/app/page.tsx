"use client";

import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center space-y-8">
        {/* Logo/Icon Placeholder */}
        <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl shadow-purple-500/20 animate-bounce">
          <div className="w-12 h-12 border-4 border-t-purple-400 border-r-blue-400 border-b-purple-400 border-l-blue-400 rounded-full animate-spin" />
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            TaskMaster
          </h1>
          <p className="text-xl text-slate-300 font-light">
            Crafting your ultimate productivity workspace...
          </p>
        </div>

        {/* Loading Indicator */}
        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden backdrop-blur-sm border border-white/5">
          <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-1/2 animate-[shimmer_2s_infinite_linear]" />
        </div>
        
        <div className="flex gap-2 text-sm text-slate-400">
          <span className="animate-pulse">Initializing Core...</span>
          <span className="animate-pulse delay-300">Loading UI...</span>
          <span className="animate-pulse delay-700">Preparing Storage...</span>
        </div>
      </div>
    </div>
  );
}

