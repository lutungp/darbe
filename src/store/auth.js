import $axios from '../api.js'

const state = () => ({

})

const mutations = {

}

const actions = {
    submit({ commit }, payload) {
        localStorage.setItem('token', null);
        commit('SET_TOKEN', null, { root: true });
        return new Promise((resolve, reject) => {
            $axios.post('/login', payload)
            .then((response) => {
                if (response.data.code == '200') {
                    localStorage.setItem('token', response.data.token.token);
                    commit('SET_TOKEN', response.data.token.token, { root: true });
                } else {
                    commit('SET_ERRORS', { invalid: '202' }, { root: true });
                }
                resolve(response.data);
            })
            .catch((error) => {
                if (error.response.code == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true });
                }
            });
        });
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
