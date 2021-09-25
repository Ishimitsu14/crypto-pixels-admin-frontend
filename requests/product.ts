import { NuxtAxiosInstance } from '@nuxtjs/axios'

export default (axios: NuxtAxiosInstance) => ({
  get: async () => await axios.$get('/product'),
  find: async (uuid: string) => await axios.$get(`/product/${uuid}`),
  generate: async (data: { countImages: number; isAttributes: boolean }) => (
    await axios.$post('/product/generate', data)
  ),
  uploadTiles: async (formData: FormData, params: { width: number; height: number }) => (
    await axios.$post('/product/upload-tiles', formData, {
      params,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  )
})
