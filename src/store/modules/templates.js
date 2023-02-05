import Templates from '../../data/list-template';


const state = {
    listTemplate: Templates.data
}

export const templates = {
    namespaced: true,
    state: {
        listTemplate: [],
    },
    actions: {
        getListTemplate({ dispatch, commit }) {
            // template service
            // get list template
            commit('setListTemplate', Templates.data);
        },
    },
    mutations: {
        setListTemplate(state, listTemplate) {
            state.listTemplate = [...listTemplate];
        },
    },
};
