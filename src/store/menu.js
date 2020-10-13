import $axios from '../api.js'
import Layout from '@/components/Layout/Layout';

const state = () => ({
    menus       : [],
    datamenus   : [],
    dataRoute   : [],
    dataSidebar : []
});

const mutations = {
    ASSIGN_DATASIDEBAR(state, menu) {
        var menuLV1 = menu.filter(p=>p.menu_level == 1);

        var dataSidebar = [];
        menuLV1.forEach(element => {
            var menuLV2 = menu.filter(p=>p.menu_level == 2 && p.menu_parent_id == element.menu_id);
            var childrenMenu = [];
            menuLV2.forEach(element2 => {
                childrenMenu.push({
                    header : element2.menu_nama,
                    link : element2.menu_link
                });
            });

            if (childrenMenu.length > 0) {
                dataSidebar.push({
                    activeItem : '',
                    header : element.menu_nama,
                    link : element.menu_link,
                    iconName : "flaticon-network",
                    index : 'master',
                    childrenLinks : childrenMenu
                });
            } else {
                dataSidebar.push({
                    activeItem : '',
                    header : element.menu_nama,
                    link : element.menu_link,
                    iconName : "flaticon-network",
                    index : 'master'
                })
            }
        });

        state.dataSidebar = dataSidebar;
    },

    ASSIGN_DATAROUTES(state, menu) {
        var menuLV1 = menu.filter(p=>p.menu_level == 1);

        var dataRoute = [];
        menuLV1.forEach(element => {
            var menuLV2 = menu.filter(p=>p.menu_level == 2 && p.menu_parent_id == element.menu_id);
            var childrenMenu = [];
            menuLV2.forEach(element2 => {
                childrenMenu.push({
                    path: element2.menu_link,
                    name: element2.menu_nama,
                    component: import(/* webpackChunkName: "page" */ `@/pages${element2.menu_link}.vue`),
                    meta: { requiresAuth: true }
                });
            });

            if (childrenMenu.length > 0 ) {
                dataRoute.push({
                    path: element.menu_link,
                    name: element.menu_nama,
                    component: Layout,
                    children: childrenMenu
                });
            } else {
                dataRoute.push({
                    path: element.menu_link,
                    name: element.menu_nama,
                    meta: { requiresAuth: true },
                    component : () => import(/* webpackChunkName: "page" */ `@/pages${element.menu_link}.vue`)
                });
            }
        });
        
        state.dataRoute = dataRoute;
    }
};

const getters = {
    GET_RPANEL_MENU(state){
        var data = {
            dataRoles : state.dataRoles,
            menus : state.menus
        }
        return data;
    }
};

const actions = {
    getDataSidebar({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            //REQUEST DATA DENGAN ENDPOINT /TABS
            $axios.get(`/menus`)
            .then((response) => {
                /* SIMPAN DATA KE STATE MELALUI MUTATIONS */
                commit('ASSIGN_DATASIDEBAR', response.data.data);
                commit('ASSIGN_DATAROUTES', response.data.data);
                commit('ASSIGN_DATAROUTES', state.dataRoute, { root: true });
                resolve(response);
            });
        });
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};