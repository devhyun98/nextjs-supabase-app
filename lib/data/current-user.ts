// 더미 사용자 (로그인 상태 시뮬레이션)
// 이 값을 변경하여 host/participant 시나리오 전환
export const CURRENT_USER_ID = 'user-1';
export const CURRENT_USER_IS_ADMIN = false;

export const currentUser = {
  id: CURRENT_USER_ID,
  email: 'demo@gather.app',
  name: '데모 사용자',
  avatarUrl: 'https://avatar.vercel.sh/demo',
  role: (CURRENT_USER_IS_ADMIN ? 'admin' : 'user') as 'user' | 'admin',
  createdAt: new Date('2026-01-01'),
  updatedAt: new Date('2026-06-18'),
};
