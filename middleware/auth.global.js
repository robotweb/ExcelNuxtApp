export default defineNuxtRouteMiddleware( async (to, from) => {
  const { userId} = useAuth()
  if (!userId.value && to.path !== "/login") {
    return navigateTo("/login");
  }

  if (userId.value && to.path === "/login") {
    return navigateTo("/");
  }

})