export const useApi = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBase
  const token = localStorage.getItem('token')

  const validateToken = async () => {
    try{
      if(!token) {
        navigateTo('/')
        return
      }
      const response = await $fetch<T>(`${baseUrl}user/validate-token`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(response)
      if(response.status == 401) {
        navigateTo('/')
      }
    } catch (error) {
      console.error(error)
      throw error
    }
   
  }

  const get = async <T>(endpoint: string, query: any = {}) => {
    await validateToken()
    return await $fetch<T>(`${baseUrl}${endpoint}`, {
      params: query,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
  }

  const post = async <T>(endpoint: string, payload: any, headers: any = {'Content-Type': 'application/json','Accept': 'application/json'}) => {
    await validateToken()
    return await $fetch<T>(`${baseUrl}${endpoint}`, {
      method: 'POST',
      body: payload,
      headers: {
          'Authorization': `Bearer ${token}`,
          ...headers
        },
    })
}


  const _delete = async <T>(endpoint: string) => {
    await validateToken()
    return await $fetch<T>(`${baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  const put = async <T>(endpoint: string, payload: any) => {
    await validateToken()
    return await $fetch<T>(`${baseUrl}${endpoint}`, {
      method: 'PUT',
      body: payload,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  return {
    get,
    post,
    _delete,
    put
  }
}
