export const getters = {

  authtenticated(state) {
    return state.auth.loggedIn
  },
  user(state) {
    return state.auth.user
  }

}
