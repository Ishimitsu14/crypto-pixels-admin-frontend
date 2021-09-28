export default function ({ $axios }) {
  $axios.onRequest((config) => {
    config.headers.Authorization = `Basic ${btoa('Login:Password')}`
  })
}
