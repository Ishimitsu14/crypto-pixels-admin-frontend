import { NuxtAxiosInstance } from '@nuxtjs/axios'

export default (axios: NuxtAxiosInstance) => ({
  uploadTitles: async (formData: FormData) => await axios.$post('/upload-titles', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
})
