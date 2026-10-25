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

  const logout = () => {
    token.value = null
    user.value = null
    navigateTo('/login')
  }

  const isLoggedIn = computed(() => !!token.value)

  return { token, user, register, login, logout, isLoggedIn }
}