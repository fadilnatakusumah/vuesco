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
    // USER ACTIONS
    getCurrentUser: ({ commit, dispatch }) => {
      ApolloClient.query({
        query: Queries.GET_CURRENT_USER
      })
        .then(({ data }) => {
          // console.log("TCL: data", data)
          commit('updateState', ['currentUser', data.getCurrentUser])
        })
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
            await localStorage.setItem('token_vuesco', data.signupUser.token);
            await dispatch('getCurrentUser');
            resolve()
          })
          .catch(err => reject(err.message));
      })
    },
    signinUser: ({ commit, dispatch }, variables) => {
      localStorage.setItem('token_vuesco', '')
      return new Promise((resolve, reject) => {
        ApolloClient.mutate({
          mutation: Mutations.SIGNIN_USER,
          variables
        })
          .then(async ({ data }) => {
            await localStorage.setItem('token_vuesco', data.signinUser.token);
            // console.log("localStorage", localStorage.getItem('token_vuesco'));
            await dispatch('getCurrentUser');
            resolve()
          })
          .catch(err => reject(err.message));
      })
    },
    signoutUser: async ({ commit }) => {
      commit('updateState', ['currentUser', null]);
      await localStorage.setItem('token_vuesco', '');
      await ApolloClient.resetStore();
    },

    // POST ACTIONS
    getPosts: async () => {
      return new Promise((res, rej) => {
        ApolloClient.query({
          query: Queries.GET_POSTS
        })
          .then(({ data }) => res(data.getPosts))
          .catch(err => rej(err.message))
      })
    },
    getMyPosts: async ({ state }) => {
      return new Promise((res, rej) => {
        ApolloClient.query({
          query: Queries.GET_MY_POSTS,
          variables: { user_id: state.currentUser._id }
        })
          .then(({ data }) => res(data.getMyPosts))
          .catch(err => rej(err.message))
      })
    },
    createPost: async ({ state }, variables) => {
      return new Promise((res, rej) => {
        ApolloClient.mutate({
          mutation: Mutations.CREATE_POST,
          variables: {
            ...variables,
            createdBy: state.currentUser._id
          }
        })
          .then(({ data }) => res(data.createPost))
          .catch(err => rej(err.message))
      })
    },
    deletePost: async (_, variables) => {
      console.log("TCL:  variables", variables)
      return new Promise((res, rej) => {
        ApolloClient.mutate({
          mutation: Mutations.DELETE_POST,
          variables: {
            ...variables,
          }
        })
          .then(({ data }) => res(data.deletePost))
          .catch(err => rej(err.message))
      })
    }
  },
  getters: {
    currentUser: state => state.currentUser,
  },
  modules: {
  }
})
