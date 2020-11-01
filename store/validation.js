export const state = () => ({
  errors: {}
});

//getters

export const getters = {
  errors(state) {
    return state.errors
  }
};

//mutations
export const mutations = {
  SET_VALIDATIONS_ERRORS(state,errors) {
    state.errors = errors
  }
};

//actions

export const actions = {
  setErrors({commit},errors) {
    commit("SET_VALIDATIONS_ERRORS",errors)
  },
  clearErrors({commit}){
    commit("SET_VALIDATIONS_ERRORS",{})
  }
};
