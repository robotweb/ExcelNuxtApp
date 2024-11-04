export const useApi = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBase

  const get = async <T>(endpoint: string) => {
    return await $fetch<T>(`${baseUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const post = async <T>(endpoint: string, payload: any) => {
    try {
      console.log('Request URL:', `${baseUrl}${endpoint}`)
      console.log('Request Payload:', payload)

      return await $fetch<T>(`${baseUrl}${endpoint}`, {
        method: 'POST',
        body: payload,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      })
    } catch (err) {
      console.error('API Error:', err)
      throw err
    }
  }

  const _delete = async <T>(endpoint: string) => {
    return await $fetch<T>(`${baseUrl}${endpoint}`, {
      method: 'DELETE'
    })
  }

  const put = async <T>(endpoint: string, payload: any) => {
    return await $fetch<T>(`${baseUrl}${endpoint}`, {
      method: 'PUT',
      body: payload
    })
  }

  return {
    get,
    post,
    _delete,
    put
  }
}
