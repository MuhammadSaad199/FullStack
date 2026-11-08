export const useAuth = () => {
  const api = useApi()
  const token = useCookie<string | null>('token', { maxAge: 60 * 60 })
  const user = useState<any>('user', () => null)

  const register = async (payload: {
    username: string
    userEmail: string
    password: string
    confirm: string
    role: string
  }) => {
    const { data: res } = await api.post('/auth/register', payload)
    token.value = res.token
    user.value = res.user
    return res
  }

  const login = async (payload: { userEmail: string; password: string }) => {
    const { data: res } = await api.post('/auth/login', payload)
    token.value = res.token
    user.value = res.user
    return res
  }

  const logout = async () => {
    // Backend ko batao (token abhi cookie mein hai, useApi khud laga deta hai)
    try {
      await api.post('/auth/logout')
    } catch (e) {
      // Backend fail ho (token expire/server band) tab bhi local logout karna hai
      console.warn('Logout API failed:', e)
    }
    token.value = null
    user.value = null
    await navigateTo('/login')
  }

  const isLoggedIn = computed(() => !!token.value)

  return { token, user, register, login, logout, isLoggedIn }
}