export interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

export interface ChatResponse {
  reply: string;
  conversationId: string;
}

const BASE_URL = 'http://localhost:3000';

// 自动获取一个测试 Token 用于聊天交互
export async function getTestToken(): Promise<string> {
  const credentials = { username: 'agent_tester', password: 'password123' };

  // 尝试登录
  let res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  // 如果登录失败可能是用户不存在，我们尝试先注册一个
  if (!res.ok) {
    await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    // 重新登录
    res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
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
