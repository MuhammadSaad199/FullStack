// Login/Register pages: pehle se logged in ho toh home par bhej do
export default defineNuxtRouteMiddleware(() => {
  const { isLoggedIn } = useAuth()

  if (isLoggedIn.value) {
    return navigateTo('/')
  }
})
