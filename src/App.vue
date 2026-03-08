<template>
  <div class="h-screen w-screen bg-slate-900 text-slate-100 flex overflow-hidden font-sans">
    <!-- Sidebar -->
    <aside class="w-64 bg-slate-800 border-r border-white/5 flex flex-col shrink-0">
      <div
        class="p-5 font-bold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center gap-2 border-b border-white/5">
        <SparklesIcon class="w-6 h-6 text-indigo-400" />
        AI Studio
      </div>
      <div class="p-4 text-xs font-medium text-slate-500 uppercase tracking-widest mt-2">
        Workspace
      </div>
      <div class="px-3 space-y-1">
        <div
          class="px-3 py-2.5 bg-indigo-500/10 text-indigo-300 rounded-lg text-sm flex items-center gap-3 cursor-pointer border border-indigo-500/20">
          <BotIcon class="w-4 h-4" /> Agent Generation
        </div>
        <div
          class="px-3 py-2.5 text-slate-400 hover:text-slate-300 rounded-lg text-sm flex items-center gap-3 cursor-pointer transition-colors">
          <DatabaseIcon class="w-4 h-4" /> Vectors Database
        </div>
      </div>
      <div class="mt-auto p-4 border-t border-white/5 text-xs text-slate-500 flex flex-col gap-1">
        <span>Powered by Gemini 2.5</span>
        <span class="text-indigo-400/50">RAG Image Engine v1.0</span>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col min-w-0 bg-[#0B1120] relative">
      <!-- Top bar -->
      <header
        class="h-14 border-b border-white/5 flex items-center justify-between px-6 shrink-0 bg-slate-900/50 backdrop-blur-md z-10">
        <div class="text-sm font-medium text-slate-300">Image Generation Console (RAG Enabled)</div>
        <div class="flex items-center gap-3">
          <div
            class="px-2.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs flex items-center gap-2 font-medium">
            <div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
            Service Active
          </div>
        </div>
      </header>

      <!-- ChatBot acts as the main view -->
      <div class="flex-1 overflow-hidden">
        <ChatBot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import ChatBot from './components/ChatBot.vue';
import { SparklesIcon, BotIcon, DatabaseIcon } from 'lucide-vue-next';
</script>

<style scoped>
/* 定义全局无缝滚动条供参考 */
</style>