import { NuxtAxiosInstance } from '@nuxtjs/axios'

export default (axios: NuxtAxiosInstance) => ({
  get: async () => await axios.$get('/gif'),
  find: async (uuid: string) => await axios.$get(`/gif/${uuid}`),
  generate: async () => await axios.$get('/gif/generate')
})
