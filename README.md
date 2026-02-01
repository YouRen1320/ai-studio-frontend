1. 这个是购物城项目的前端部分

1.使用pnpm create Shopping_Cart_Frontend 创建前端项目
2.pnpm install 下载依赖
3.样式方面使用tailwindcss ,npm install tailwindcss @tailwindcss/vite //https://tailwindcss.com/docs/installation/using-vite
4.启动项目 pnpm dev
5.mkdir src/api src/components src/views src/types src/store
src/api: 专门放你后面要写的接口请求。
src/components: 放通用的积木块（比如头部、按钮、商品卡片）。
src/views: 放具体的页面（比如商品列表页、购物车页）。
src/types: 放 TypeScript 的类型定义（比如定义“商品”长什么样）。
src/store: 放状态管理（后面用 Pinia 存购物车数据）。

6. 安装图标库 pnpm add lucide-vue-next
7. 