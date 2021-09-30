import Cookies from 'js-cookie'

export const state = () => ({
  token: null
})

export const mutations = {
  SET_AUTH (state, token) {
    state.token = Cookies.get('token') || null
    Cookies.set('token', token)
  }
}

export const actions = {
  login ({ commit }, form) {
    commit('SET_AUTH', btoa(`${form.login}:${form.password}`))
  },
  logout ({ commit }) {
    commit('SET_AUTH', null)
  }
}
