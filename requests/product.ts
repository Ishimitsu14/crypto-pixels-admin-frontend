import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { IProductRarity, IProduct } from '~/types/IProduct'
import { IRequest } from '~/types/IRequest'

export default (axios: NuxtAxiosInstance) => ({
  get: async (
    params: { page: number; perPage: number; sortBy: string; sortDesc: number }
  ): Promise<{ products: IProduct[]; total: number }> => (
    await axios.$get('/product', { params })
  ),
  find: async (id: number): Promise<IProduct> => await axios.$get(`/product/${id}`),
  destroy: async (id: number): Promise<IRequest> => await axios.$delete(`/product/${id}`),
  rarity: async (): Promise<IProductRarity[]> => await axios.$get('/product/rarity'),
  generate: async (data: { countImages: number; isAttributes: boolean }): Promise<IRequest> => (
    await axios.$post('/product/generate', data)
  ),
  upload: async (formData: FormData, id: number): Promise<IProduct> => (
    await axios.$post(`/product/upload/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  ),
  uploadTiles: async (
    formData: FormData,
    params: { width: number; height: number }
  ): Promise<{ success: { message: string } }> => (
    await axios.$post('/product/upload-tiles', formData, {
      params,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  ),
  getImageData: (uuid: string): Promise<string> => {
    return new Promise<any>((resolve, reject) => {
      axios.$get(`/product/image/${uuid}`, { responseType: 'blob' }).then((image) => {
        const reader = new window.FileReader()
        reader.readAsDataURL(image)
        reader.onload = () => {
          const imageDataUrl = reader.result
          resolve(imageDataUrl)
        }
        reader.onerror = (err: any) => {
          reject(err)
        }
      })
    })
  }
})
