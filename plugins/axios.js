import Cookies from 'js-cookie'

export default function ({ $axios, store, redirect }) {
  $axios.onError((error) => {
    if (error.response.status === 401) {
      store.dispatch('auth/logout')
      redirect('/login')
    }
  })
  $axios.onRequest((config) => {
    config.headers.Authorization = `Basic ${Cookies.get('token')}`
  })
}
