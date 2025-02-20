export default defineNuxtRouteMiddleware( async (to, from) => {
  console.log("validate jwt")
  const token = useCookie('jwt'); // Get JWT from cookies

  const publicRoutes = [
    '/track-order'
  ]

  if (publicRoutes.includes(to.path)) {
    return;
  }
  
  if (!token.value && to.path !== '/login') {
    return navigateTo('/login'); // Redirect to login if not authenticated
  }

  try{

    const cookie = useCookie('jwt');
    if(!cookie.value){
      return;
    }
    const response = await useApi().get('/user/validate-token')
    //console.log(response)
    //console.log(to)
    if(to.path.includes('/logged-in')){
      const company_uuid = response.company[0].company_user_company_uuid
      const config = useRuntimeConfig()
      const appMode = config.public.appMode
      if(appMode == 'DRIVER'){
        return navigateTo(`/${company_uuid}/driver`)
      }
      return navigateTo(`/${company_uuid}/orders`)

    }
  }catch(error){
    console.log(error)
  }



})