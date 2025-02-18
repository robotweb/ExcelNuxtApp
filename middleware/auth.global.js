export default defineNuxtRouteMiddleware( async (to, from) => {
  const { userId} = useAuth()
  if (!userId.value && to.path != '/') {
    return navigateTo('/')
  }

})