<!-- 首页头部模块 -->
<template>
    <header class="sticky top-0 z-50 bg-red-600 shadow-md">
        <div class="flex h-12 items-center px-4 gap-3">
            <!-- 左侧菜单图标 -->
            <button class="text-white">
                <Menu :size="24"></Menu>
            </button>

            <!-- 中间搜索框 -->
            <div class="flex-1 flex items-center bg-white rounded-full px-3 py-1.5 h-8">
                <Search :size="16" class="text-gray-400 mr-2"></Search>
                <span class="text-sm text-gray-400">地球仪</span>
            </div>

            <!-- 右侧用户图标 -->
            <button class="text-white">
                <User :size="24"></User>
            </button>
        </div>
    </header>
</template>

<script setup>
import { Menu, Search, User } from 'lucide-vue-next';

</script>

<style lang="scss" scoped></style>