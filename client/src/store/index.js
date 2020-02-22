import Vue from 'vue'
import Vuex from 'vuex'

import * as Mutations from '../graphql/mutation'
import * as Queries from '../graphql/queries'

import { defaultClient as ApolloClient } from '../main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    token: null,
  },
  mutations: {
    updateState: (state, payload) => state[payload[0]] = payload[1]
  },
  actions: {
    getCurrentUser: ({ commit, dispatch }) => {
      ApolloClient.query({
        query: Queries.GET_CURRENT_USER
      })
        .then(({ data }) => commit('updateState', ['currentUser', data.getCurrentUser]))
        .catch(err => console.dir("TCL: err", err.message))
    },
    signupUser: ({ commit, dispatch, state }, variables) => {
      localStorage.setItem('token_vuesco', '')
      return new Promise((resolve, reject) => {
        ApolloClient.mutate({
          mutation: Mutations.SIGNUP_USER,
          variables
        })
          .then(async ({ data }) => {
            console.log("TCL: data ", data)
            await localStorage.setItem('token_vuesco', data.signupUser.token);
            await dispatch('getCurrentUser');
            resolve()
          })
          .catch(err => reject(err.name));
      })
    },
    // signinUser: ({ commit, dispatch }, variables) => {
    //   return ApolloClient.mutate({
    //     mutation:
    //   })
    // },
    signoutUser: async ({ commit }) => {
      commit('updateState', ['currentUser', null]);
      await localStorage.setItem('token_vuesco', '');
      await ApolloClient.resetStore();
    },
  },
  getters: {
    currentUser: state => state.currentUser,
  },
  modules: {
  }
})
