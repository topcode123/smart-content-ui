import { userService } from '../../_services';
import router from '../../router/index';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

export const authentication = {
    namespaced: true,
    state: initialState,
    getters: {

    },
    actions: {
        login({ dispatch, commit }, { username, passwordjwt }) {
            commit('loginRequest', { username });
            
            userService.login(username, passwordjwt)
                .then(
                    user => {
                        commit('loginSuccess', user);
                        router.push('/smart-content/list-template');
                    },
                    error => {
                        commit('loginFailure', error);
                        dispatch('alert/error', error, { root: true });
                    }
                );
        },
        logout({ commit }) {
            userService.logout();
            commit('logout');
        }
    },
    mutations: {
        loginRequest(state, user) {
            state.status = { loggingIn: true };
            state.user = user;
        },
        loginSuccess(state, user) {
            state.status = { loggedIn: true };
            console.log(user)
            state.user = user;
        },
        loginFailure(state) {
            state.status = {};
            state.user = null;
        },
        logout(state) {
            state.status = {};
            state.user = null;
        }
    }
};