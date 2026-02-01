<!-- 商品卡片组件 -->
<template>
    <div class="bg-white rounded-lg overflow-hidden flex flex-col">
        <!-- 商品图片 -->
        <div class="relative w-full aspect-square bg-gray-100">
            <img :src="product.coverUrl" :alt="product.title" class="w-full h-full object-cover">
        </div>

        <!-- 商品标题 -->
        <div class="p-2 flex flex-col flex-1 justify-between">
            <h3 class="text-sm text-gray-900 line-clamp-2 leading-relaxed mb-2 font-medium">{{ product.title }}</h3>
        </div>

        <!--  如果商品有标签就渲染出来 -->
        <div>
            <div v-if="product.tags && product.tags.length > 0" class="flex flex-wrap gap-1 mb-1">
                <span v-for="tag in product.tags" :key="tag"
                    class="px-1 py-0.5 text-[10px] border border-red-500 text-red-500 rounded">
                    {{ tag }}
                </span>
            </div>

            <!-- 商品金额 -->
            <div class="flex items-end items-baseline">
                <span class="text-xs text-red-600 font-bold">¥</span>
                <span class="text-lg text-red-600 font-bold ml-0.5">{{ product.price }}</span>
            </div>

            <!-- 评论数 -->
            <div class="flex justify-between items-center mt-1">
                <span class="text-xs text-gray-400">{{ product.commentCount }}</span>
                <button class="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">看相似</button>
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