export const useApi = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBase

  const retrieveJwtToken = async () => {
    const session = useCookie('__session').value;
    //console.log('mysession',session)
    return session
  };

  const get = async <T>(endpoint: string, query: any = {}) => {
    const token = await retrieveJwtToken();
    //console.log(token)
    return await $fetch<T>(`${baseUrl}${endpoint}`, {
      params: query,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
  }

  const post = async <T>(endpoint: string, payload: any, headers: any = {'Content-Type': 'application/json','Accept': 'application/json'}) => {
    const token = await retrieveJwtToken();
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
    const token = await retrieveJwtToken();
    return await $fetch<T>(`${baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  const put = async <T>(endpoint: string, payload: any) => {
    const token = await retrieveJwtToken();
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
