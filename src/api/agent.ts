export interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

export interface ChatResponse {
  reply: string;
  conversationId: string;
}

// 后端地址来自 Vite 环境变量，未配置时只连接本机开发服务。
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// 自动注册固定账号只适用于本地演示，生产环境必须接入真实登录流程。
export async function getTestToken(): Promise<string> {
  if (!import.meta.env.DEV) {
    throw new Error('生产构建未接入用户登录，已禁止自动创建演示账号');
  }

  const credentials = {
    username: import.meta.env.VITE_DEMO_USERNAME,
    password: import.meta.env.VITE_DEMO_PASSWORD,
  };
  if (!credentials.username || !credentials.password) {
    throw new Error('请先在本地环境配置 VITE_DEMO_USERNAME 和 VITE_DEMO_PASSWORD');
  }

  // 尝试登录
  let res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  // 如果登录失败可能是用户不存在，我们尝试先注册一个
  if (!res.ok) {
    const registerResponse = await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!registerResponse.ok && registerResponse.status !== 409) {
      throw new Error('演示账号注册失败');
    }
    // 重新登录
    res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
  }

  if (!res.ok) {
    throw new Error('演示账号登录失败');
  }

  const json = await res.json();
  // 注意：因为后端有全局 TransformInterceptor，所有的正常返回值都会带有 code, message, data 包装
  // 我们真正需要的值在 json.data.access_token 里面
  return json.data?.access_token || json.access_token;
}

export async function sendChatMessage(
  message: string,
  token: string,
  conversationId?: string,
): Promise<ChatResponse> {
  const response = await fetch(`${BASE_URL}/agent/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Agent 接口被 AuthGuard 保护，必须传 JWT Token
    },
    body: JSON.stringify({
      message,
      conversationId,
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || '大模型通信失败');
  }

  const json = await response.json();
  // 后端全局 TransformInterceptor 会包装成 { code, message, data: { reply, conversationId } }
  // 真正的业务数据在 json.data 里面
  return (json.data ?? json) as ChatResponse;
}
