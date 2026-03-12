# 🌃 AI Studio (前端工作区)

这是一个基于 **Vue 3 + Vite** 构建的全屏沉浸式 AI 绘画助手工作区，采用深度定制的赛博朋克 / 暗黑科技风 UI 打造。

## ✨ 核心特性

- **沉浸式暗黑美学**：全局采用富有质感的高级灰蓝、暗夜黑与毛玻璃（Glassmorphism）特效，去除了所有的冗余侧边栏，将焦点完全集中在生图交互视窗。
- **打字机动效沉浸交互**：包含气泡升起加载动效、底部毛玻璃遮罩以及基于 Markdown 的图文混排气泡框。
- **Markdown 引擎修复**：内建基于正则表达式的超轻量 Markdown 解析机制，深度容错并支持带有特殊符号的资源路径渲染和拦截。
- **防竞态与自动鉴权兜底**：对话交互内置自恢复防御机制（Defensive Token Fetching），如果用户首次输入时组件还没取得授权 `Token`，可主动拦截并下发重试。

## 🧩 核心组件流向

- **`App.vue`**：根布局组件，作为全屏 AI Studio 画板的框架容器。
- **`ChatBot.vue`**：居于大屏中央的核心聊天大脑。包含历史流记录、动画过渡、Markdown 编排与底层交互逻辑。
- **`api/agent.ts`**：RESTful 通信与数据层适配器。封装鉴权、拦截及与后端的 `TransformInterceptor` 包装格式接洽。

## 🚀 快速启动

1. **环境准备**
   确保系统已安装现代版本的 `Node.js`。

2. **安装依赖**

```bash
pnpm install
```

3. **连接后端**
   请确保本地的 AI Studio 后端已经在 `http://localhost:3000` 运行。

4. **启动开发服务器**

```bash
pnpm dev
```

项目通常会运行在 `http://localhost:5173` 或者因端口被占用自动顺延至 `5174` 等。

## 🛠 技术栈

- Vue 3 (Composition API)
- Vite
- Tailwind CSS
- Lucide Vue Next (现代图标库)
- TypeScript

---

🔮 _Unleash your imagination, created by AI Studio._
