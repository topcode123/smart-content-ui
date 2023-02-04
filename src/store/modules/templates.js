export const templates = {
    namespaced: true,
    state: {
        listTemplate: [],
    },
    actions: {
        getListTemplate({ dispatch, commit }) {
            // template service
            // get list template
            commit('', {});
        },
    },
    mutations: {
        setListTemplate(state, listTemplate) {
            state.listTemplate = [...listTemplate];
        },
    },
};
