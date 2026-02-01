<template>
  <div class="min-h-screen bg-gray-100">
    <!-- 头部 -->
    <SiteHeader></SiteHeader>

    <!-- 中间内容 -->
    <main class="p-2">
      <div class="grid grid-cols-2 gap-2">
        <ProductCard v-for="item in products" :key="item.id" :product="item"></ProductCard>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ProductCard from './components/ProductCard.vue';
import SiteHeader from './components/SiteHeader.vue';
import type { Product } from './types/products';
import { getProductList } from './api/products';

// 商品列表
const products = ref<Product[]>([])

// 生命周期——初始化加载数据
onMounted(async () => {
  products.value = await getProductList(); //调用商品列表接口
})
</script>


<style scoped></style>