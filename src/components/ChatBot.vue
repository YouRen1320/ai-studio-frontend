<template>
  <div class="flex flex-col h-full w-full">
    <!-- Messages 滚动区域 -->
    <div class="flex-1 overflow-y-auto p-6 scroll-smooth" ref="messagesContainer">
      <div class="max-w-4xl mx-auto flex flex-col space-y-8 pb-10">

        <div v-for="(msg, index) in messages" :key="index"
          :class="['flex w-full group', msg.role === 'user' ? 'justify-end' : 'justify-start']">
          <!-- 头像 -->
          <div v-if="msg.role === 'ai'"
            class="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center mr-4 flex-shrink-0 shadow-lg text-white mt-1">
            <SparklesIcon class="w-4 h-4" />
          </div>

          <!-- 消息体 -->
          <div :class="[
            'max-w-[85%] text-[15px] leading-relaxed relative',
            msg.role === 'user'
              ? 'bg-indigo-600 text-white px-5 py-3.5 rounded-2xl rounded-tr-sm shadow-md'
              : 'text-slate-300 py-1'
          ]">
            <div class="markdown-body" v-html="formatMessage(msg.content)"></div>
          </div>

          <div v-if="msg.role === 'user'"
            class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center ml-4 flex-shrink-0 shadow-md mt-1 text-slate-300">
            <UserIcon class="w-4 h-4" />
          </div>
        </div>

        <!-- 当前输入中的 Loading 动画 -->
        <div v-if="isLoading" class="flex w-full justify-start">
          <div
            class="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center mr-4 flex-shrink-0 shadow-lg text-white mt-1">
            <BotIcon class="w-4 h-4 animate-pulse" />
          </div>
          <div class="py-3 flex space-x-2 items-center h-10">
            <div class="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style="animation-delay: 0ms;"></div>
            <div class="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style="animation-delay: 150ms;"></div>
            <div class="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style="animation-delay: 300ms;"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部输入框区域 -->
    <div class="p-6 shrink-0 z-10 relative">
      <div class="max-w-4xl mx-auto relative pointer-events-auto">
        <form @submit.prevent="sendMessage" class="relative">
          <textarea ref="inputRef" v-model="inputMsg" placeholder="下达大模型出图指令，如：请帮我找一张充满赛博朋克风格的女角色图片..."
            class="w-full bg-slate-800/80 border border-white/10 text-slate-200 text-sm rounded-xl pl-5 pr-14 py-4 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-slate-800 transition-all shadow-lg placeholder-slate-500 resize-none h-14 min-h-[56px] overflow-hidden leading-6"
            :disabled="isLoading" @keydown.enter.prevent="sendMessage" />
          <button type="submit" :disabled="!inputMsg.trim() || isLoading"
            class="absolute right-2 top-2 bottom-2 w-10 flex items-center justify-center rounded-lg bg-indigo-600 text-white disabled:opacity-50 disabled:bg-slate-700 hover:bg-indigo-500 transition-colors">
            <SendIcon class="w-4 h-4 ml-0.5" />
          </button>
        </form>
        <div class="text-center text-[11px] text-slate-500 mt-3 font-medium tracking-wide">
          Agent 运行时将分析 Prompt 并将其转化为知识点匹配特征库检索相似图片。模型响应时间视网络状况而定。
        </div>
      </div>

      <!-- 底部遮罩毛玻璃渐变，为了好看 -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-[#0B1120] to-transparent pointer-events-none -z-10 h-32 -top-10">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, shallowRef, onMounted } from 'vue';
import { BotIcon, SendIcon, UserIcon, SparklesIcon } from 'lucide-vue-next';
import { sendChatMessage, getTestToken, type ChatMessage } from '../api/agent';

const isLoading = ref(false);
const inputMsg = ref('');
const messages = ref<ChatMessage[]>([
  { role: 'ai', content: '您好！我是您的 AI Agent 引擎。此项目现已完成 **RAG 检索式生图体系**的构建，所有商城购物组件已全部下线卸载。\n\n您可以对我用自然语言下达指令，例如：\n> "请帮我生成一张帅气的动作美少女图片"\n> "我想要看唯美治愈的星空或者是海滩夏日，有存货吗？"' }
]);
const inputRef = shallowRef<HTMLTextAreaElement | null>(null);
const messagesContainer = shallowRef<HTMLDivElement | null>(null);

let token = '';
let currentConversationId = '';

onMounted(async () => {
  try {
    token = await getTestToken();
  } catch (err) {
    console.error(err);
  }
  inputRef.value?.focus();
});

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

const sendMessage = async () => {
  if (!inputMsg.value.trim() || isLoading.value) return;

  // 防御性补救：如果 onMounted 拉取还没完成用户就发了消息，强制等待 token 获取
  if (!token) {
    try {
      token = await getTestToken();
    } catch (err) {
      messages.value.push({ role: 'ai', content: '⚠️ 无法获取身份授权，请检查后端服务连通性！' });
      return;
    }
  }

  const content = inputMsg.value.trim();
  messages.value.push({ role: 'user', content });
  inputMsg.value = '';
  isLoading.value = true;
  scrollToBottom();

  // 用一个微小的高度变化来适应自动撑开的 textarea (可选，此处定死了一行高度，如果拉长可以后续做自动适应)
  if (inputRef.value) {
    inputRef.value.style.height = '56px';
  }

  try {
    const res = await sendChatMessage(content, token, currentConversationId);
    currentConversationId = res.conversationId;
    messages.value.push({ role: 'ai', content: res.reply });
  } catch (err: any) {
    messages.value.push({ role: 'ai', content: '⚠️ 请求失败: ' + err.message });
  } finally {
    isLoading.value = false;
    scrollToBottom();
    nextTick(() => inputRef.value?.focus());
  }
};

const formatMessage = (text: string) => {
  if (!text) return '';
  let formatted = text;

  // 解析 Markdown 图片 (支持大图查看的样式规划)
  formatted = formatted.replace(
    /!\[(.*?)\]\((https?:\/\/[^\s]+)\)/g,
    (_match, alt, url) => {
      // 兼容某些 Markdown 生成工具 URL 内部包含了特殊符号导致非贪婪匹配异常的问题
      const cleanUrl = url.replace(/["')\]]+$/, '').trim();
      return `<div class="mt-4 mb-2"><img src="${cleanUrl}" alt="${alt}" class="w-full max-w-lg rounded-xl shadow-lg border border-white/10 hover:border-indigo-500/50 hover:scale-[1.02] transition-all duration-300 object-cover" /></div>`;
    }
  );

  // 粗体
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-indigo-300">$1</span>');
  // 引用块 (确保前边加个非捕获以匹配行首内容)
  formatted = formatted.replace(/(?:^|\n)> (.*?)(?=\n|$)/g, '<div class="pl-3 py-1 my-2 border-l-4 border-indigo-500/50 bg-indigo-500/10 rounded-r opacity-80">$1</div>');

  // 将普通的换行符替换为真正的 br，其他纯文本部分保留不动
  formatted = formatted.replace(/\n/g, '<br/>');
  return `<span>${formatted}</span>`;
};
</script>

<style scoped>
/* 隐藏滚动条但保留滚动功能 */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

/* 适配 v-html 中的 HTML 样式的修正 */
::v-deep(.markdown-body) {
  word-break: break-word;
}

::v-deep(.markdown-body br + br) {
  display: block;
  content: "";
  margin-bottom: 0.5em;
}
</style>
