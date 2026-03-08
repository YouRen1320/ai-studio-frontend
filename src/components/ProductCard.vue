<!-- 商品卡片组件 -->
<!-- 商品卡片组件 -->
<template>
    <div
        class="bg-white/70 backdrop-blur-lg border border-white/50 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer relative">
        <!-- 商品图片 -->
        <div class="relative w-full aspect-square bg-indigo-50/50 overflow-hidden">
            <img :src="product.coverUrl" :alt="product.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 origin-center">
            <!-- 动漫风格的高光叠加层 -->
            <div
                class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            </div>
        </div>

        <!-- 商品标题 -->
        <div class="p-3 flex flex-col flex-1 justify-between">
            <h3
                class="text-sm text-slate-800 line-clamp-2 leading-relaxed mb-2 font-medium group-hover:text-indigo-600 transition-colors">
                {{ product.title }}</h3>
        </div>

        <!-- 标签与价格区 -->
        <div class="px-3 pb-3">
            <div v-if="product.tags && product.tags.length > 0" class="flex flex-wrap gap-1.5 mb-2">
                <span v-for="tag in product.tags" :key="tag"
                    class="px-2 py-0.5 text-[10px] font-medium bg-pink-100/80 text-pink-600 border border-pink-200/50 rounded-full shadow-sm">
                    {{ tag }}
                </span>
            </div>

            <!-- 商品金额 -->
            <div class="flex items-baseline mb-1">
                <span class="text-xs text-pink-600 font-bold ml-0.5">¥</span>
                <span class="text-lg text-pink-600 font-extrabold tracking-tight ml-0.5">{{ product.price }}</span>
            </div>

            <!-- 评论数与按钮 -->
            <div class="flex justify-between items-center mt-0.5">
                <span class="text-[11px] text-slate-400 font-medium">{{ product.commentCount }}</span>
                <button
                    class="text-[11px] font-medium bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-500 px-3 py-1 rounded-full border border-indigo-100 hover:from-indigo-100 hover:to-purple-100 hover:shadow-sm transition-all active:scale-95">
                    看相似
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// 引入类型定义
import type { Product } from '../types/products';

// 接收父组件传来的商品数据
defineProps<{
    product: Product
}>();

</script>

<style scoped></style>