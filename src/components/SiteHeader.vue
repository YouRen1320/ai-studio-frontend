<!-- 首页头部模块 -->
<template>
    <header class="sticky top-0 z-50 bg-white/60 backdrop-blur-xl border-b border-white/40 shadow-sm transition-all">
        <div class="flex h-14 items-center px-4 gap-4 justify-between max-w-5xl mx-auto">
            <!-- 左侧菜单图标 -->
            <button
                class="text-indigo-500 hover:text-indigo-600 hover:scale-110 transition-transform p-1.5 rounded-full hover:bg-indigo-50/50">
                <Menu :size="24" stroke-width="2.5"></Menu>
            </button>

            <!-- 中间搜索框 -->
            <div
                class="flex-1 flex items-center bg-white/80 border border-indigo-100/50 rounded-full px-4 py-2 h-10 shadow-inner group hover:shadow-md transition-shadow">
                <Search :size="18" class="text-indigo-300 mr-2 group-hover:text-indigo-400 transition-colors"></Search>
                <input type="text" placeholder="探索二次元好物..."
                    class="bg-transparent w-full outline-none text-sm text-slate-700 placeholder-indigo-300" />
            </div>

            <!-- 右侧用户图标 -->
            <button
                class="text-indigo-500 hover:text-indigo-600 hover:scale-110 transition-transform p-1.5 rounded-full hover:bg-indigo-50/50 bg-gradient-to-tr from-indigo-100 to-purple-100 shadow-sm border border-white">
                <User :size="20" stroke-width="2.5"></User>
            </button>
        </div>
    </header>
</template>

<script setup>
import { Menu, Search, User } from 'lucide-vue-next';

</script>

<style lang="scss" scoped></style>