export default defineNuxtRouteMiddleware( async (to, from) => {
  console.log("validate jwt")
  const token = useCookie('jwt'); // Get JWT from cookies

  const publicRoutes = [
    '/track-order'
  ]

  if (publicRoutes.includes(to.path)) {
    return;
  }

  if(to.path === '/'){
    return navigateTo('/login')
  }

  console.log('t',token.value)
  console.log('p',to.path);
  if(token.value && to.path === '/login'){
    console.log('logged in')
    const customer = '864f67f2-a90e-46aa-8fd9-92f8dfa93cc9';
    console.log(process.env.APP_MODE)
    if(process.env.APP_MODE === 'DRIVER'){
      return navigateTo(`/driver/${customer}`)
    }
    return navigateTo(`/admin/${customer}`);
  }

if(!token.value && to.path != '/login'){
  return navigateTo('/login')
}

})