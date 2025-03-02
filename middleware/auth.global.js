export default defineNuxtRouteMiddleware( async (to, from) => {
  console.log("validate jwt")
  const token = useCookie('jwt'); // Get JWT from cookies
  const nuxtApp = useNuxtApp();
  const appMode = nuxtApp.config
  console.log('App Mode:', appMode);

  console.log(process.env.APP_MODE)

  const publicRoutes = [
    '/track-order'
  ]

  if (publicRoutes.includes(to.path)) {
    return;
  }

  console.log('t',token.value)
  console.log('p',to.path);
  if(token.value && (to.path === '/login' || to.path === '/')){
    console.log('logged in')
    const customer = '864f67f2-a90e-46aa-8fd9-92f8dfa93cc9';
    if(process.env.APP_MODE === 'DRIVER'){
      return navigateTo(`/driver/${customer}`)
    }
    return navigateTo(`/admin/${customer}/orders`);
  }

if(!token.value && to.path != '/login'){
  return navigateTo('/login')
}

})