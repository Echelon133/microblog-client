import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'

Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(VueCookies)

export default new Vuex.Store({
  getters: {
    userPresent: (state) => () => {
      return state.user !== null
    },
    accessTokenPresent: () => () => {
      return Vue.$cookies.get('accessToken') !== null
    }
  },
  state: {
    user: JSON.parse(localStorage.getItem('user'))
  },
  mutations: {
    auth_success: (state, user) => {
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user
    },
    clear_auth_state: (state) => {
      localStorage.removeItem('user')
      state.user = null
    }
  },
  actions: {
    auth_attempt: ({commit, dispatch}, user) => {
      return new Promise((resolve, reject) => {
        // send an authentication request to the auth server
        axios.post('http://localhost:8090/api/token', {}, {
          withCredentials: true,
          auth: {
            username: user.username,
            password: user.password
          }
        })
          // successful request returns refreshToken and accessToken cookies
          .then(() => {
            // accessToken is present (as a cookie)
            // get the logged user object from the resource server
            dispatch('get_user')
              .then((response) => {
                resolve(response)
              }).catch((err) => {
                commit('clear_auth_state')
                reject(err)
              })
          })
          .catch((err) => {
            commit('clear_auth_state')
            reject(err)
          })
      })
    },
    logout: ({commit}) => {
      return new Promise((resolve) => {
        // request empty refresh/access token cookies from the auth server
        // this overwrites actual token cookies that the client might have
        axios.post('http://localhost:8090/api/token/clearTokens', {}, { withCredentials: true })
          .then(() => {
            // received empty token cookies, finish the process of logging out
            commit('clear_auth_state')
            resolve()
          })
      })
    },
    renew_token: ({commit}) => {
      return new Promise((resolve, reject) => {
        // send the refreshToken and get a new accessToken
        axios.post('http://localhost:8090/api/token/renew', {}, { withCredentials: true })
          .then((response) => {
            resolve(response)
          })
          .catch((err) => {
            reject(err)
            commit('clear_auth_state')
          })
      })
    },
    get_user: ({commit}) => {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:8080/api/users/me', { withCredentials: true })
          .then((response) => {
            resolve(response)
            commit('auth_success', response.data)
          })
          .catch((err) => {
            reject(err)
            commit('clear_auth_state')
          })
      })
    },
    check_auth: ({getters, dispatch}) => {
      return new Promise((resolve) => {
        // if userPresent is true but accessToken is not present
        // it means that the user's accessToken has expired
        // and renew_token has to be called before resolving
        if (getters.userPresent() && !getters.accessTokenPresent()) {
          dispatch('renew_token')
            .then((res) => {
              resolve(res)
            })
        } else {
          // user is anonymous or access token is already present
          // therefore there is no need to renew the token
          resolve()
        }
      })
    }
  }
})
