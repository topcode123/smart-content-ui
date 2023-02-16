import firebase from 'firebase';
import Vue from 'vue';
import Router from 'vue-router';
import Userauth from '../auth/js/index';

import Auth from '../auth/auth';
import Body from '../components/body';

/* Auth */
import login from '../auth/login';
import Register from '../auth/register';

/* FAQ */

/* Support Ticket */

/* maintenance */
import Maintenance from '../pages/maintenance';

/* Error Pages */
import Error400 from '../errors/error_400';
import Error401 from '../errors/error_401';
import Error403 from '../errors/error_403';
import Error404 from '../errors/error_404';
import Error500 from '../errors/error_500';
import Error503 from '../errors/error_503';

/* comingsoon */
import ComingsoonImage from '../pages/comingsoon/comingsoon_image';
import ComingsoonSimple from '../pages/comingsoon/comingsoon_simple';
import ComingsoonVideo from '../pages/comingsoon/comingsoon_video';

// template
import CreateTemplate from '../pages/template/createtemplate';
import DetailTemplate from '../pages/template/detailtemplate';
import ListTemplate from '../pages/template/listtemplate';
import UseTemplate from '../pages/template/usetemplate';

import ListUser from '../pages/usermanagement/listuser';

/* Authentication */
import ForgetPassword from '../pages/authentication/forget_password';
import LoginOne from '../pages/authentication/login_one';
import LoginTwo from '../pages/authentication/login_two';
import LoginValidate from '../pages/authentication/login_with_validation';
import RegisterImage from '../pages/authentication/register_image';
import RegisterImage2 from '../pages/authentication/register_image2';
import ResetPassword from '../pages/authentication/reset_password';
import Unlock from '../pages/authentication/unlock';

Vue.use(Router);

const routes = [
    { path: '', redirect: { name: 'list-template' } },

    {
        path: '/smart-content',
        component: Body,
        children: [
            {
                path: 'create-template',
                name: 'create-template',
                component: CreateTemplate,
                meta: {
                    title: 'Tạo template',
                },
            },
            {
                path: 'list-template',
                name: 'list-template',
                component: ListTemplate,
                meta: {
                    title: 'Danh sách template',
                },
            },
            {
                path: 'detail-template/:id',
                name: 'Detail Template',
                component: DetailTemplate,
                meta: {
                    title: 'Chi tiết template',
                },
            },
            {
                path: 'client/template/:id',
                name: 'Use Template',
                component: UseTemplate,
                meta: {
                    title: 'Template',
                },
            },
        ],
    },
    {
        path: '/user',
        component: Body,
        children: [
            {
                path: 'list-user',
                name: 'List User',
                component: ListUser,
                meta: {
                    title: 'Danh sách người dùng',
                },
            },
            {
                path: 'list-template',
                name: 'list-template',
                component: ListTemplate,
                meta: {
                    title: 'Danh sách template',
                },
            },
            {
                path: 'detail-template/:id',
                name: 'Detail Template',
                component: DetailTemplate,
                meta: {
                    title: 'Chi tiết template',
                },
            },
            {
                path: 'client/template/:id',
                name: 'Use Template',
                component: UseTemplate,
                meta: {
                    title: 'Template',
                },
            },
        ],
    },

    {
        path: '/auth',
        component: Auth,
        children: [
            {
                path: 'login',
                name: 'Login 1',
                component: login,
                meta: {
                    title: ' login | Cuba - Premium Admin Template',
                },
            },
            {
                path: 'register',
                name: 'register 1',
                component: Register,
                meta: {
                    title: ' Register | Cuba - Premium Admin Template',
                },
            },
        ],
    },

    {
        path: '/error-400',
        name: 'Error400',
        component: Error400,
        meta: {
            title: 'Error400 | Cuba - Premium Admin Template',
        },
    },
    {
        path: '/error-401',
        name: 'Error401',
        component: Error401,
        meta: {
            title: 'Error401 | Cuba - Premium Admin Template',
        },
    },
    {
        path: '/error-403',
        name: 'Error403',
        component: Error403,
        meta: {
            title: 'Error403 | Cuba - Premium Admin Template',
        },
    },
    {
        path: '/error-404',
        name: 'Error404',
        component: Error404,
        meta: {
            title: 'Error404 | Cuba - Premium Admin Template',
        },
    },
    {
        path: '/error-500',
        name: 'Error500',
        component: Error500,
        meta: {
            title: 'Error500 | Cuba - Premium Admin Template',
        },
    },
    {
        path: '/error-503',
        name: 'Error503',
        component: Error503,
        meta: {
            title: 'Error503 | Cuba - Premium Admin Template',
        },
    },
    {
        path: '/maintenance',
        name: 'Maintenance',
        component: Maintenance,
        meta: {
            title: 'Maintenance | Cuba - Premium Admin Template',
        },
    },
    {
        path: '/comingsoon/comingsoon-simple',
        name: 'ComingsoonSimple',
        component: ComingsoonSimple,
        meta: {
            title: 'ComingsoonSimple | Cuba - Premium Admin Template',
        },
    },
    {
        path: '/comingsoon/comingsoon-image',
        name: 'ComingsoonImage',
        component: ComingsoonImage,
        meta: {
            title: 'ComingsoonImage | Cuba - Premium Admin Template',
        },
    },
    {
        path: '/comingsoon/comingsoon-video',
        name: 'ComingsoonVideo',
        component: ComingsoonVideo,
        meta: {
            title: 'ComingsoonVideo | Cuba - Premium Admin Template',
        },
    },
    {
        path: '/authentication/login/one',
        name: 'LoginOne',
        component: LoginOne,
        meta: {
            title: 'LoginOne | Cuba - Premium Admin Template',
        },
    },
    {
        path: '/authentication/login/two',
        name: 'LoginTwo',
        component: LoginTwo,
        meta: {
            title: 'LoginTwo | Cuba - Premium Admin Template',
        },
    },
    {
        path: '/authentication/login/validate',
        name: 'LoginValidate',
        component: LoginValidate,
        meta: {
            title: 'LoginValidate | Cuba - Premium Admin Template',
        },
    },
    {
        path: '/authentication/register/image',
        name: 'RegisterImage',
        component: RegisterImage,
        meta: {
            title: 'RegisterImage | Cuba - Premium Admin Template',
        },
    },
    {
        path: '/authentication/register/image2',
        name: 'RegisterImage2',
        component: RegisterImage2,
        meta: {
            title: 'RegisterImage2 | Cuba - Premium Admin Template',
        },
    },
    {
        path: '/authentication/unlockuser',
        name: 'Unlock',
        component: Unlock,
        meta: {
            title: 'Unlock | Cuba - Premium Admin Template',
        },
    },
    {
        path: '/authentication/forgetpassword',
        name: 'ForgetPassword',
        component: ForgetPassword,
        meta: {
            title: 'ForgetPassword | Cuba - Premium Admin Template',
        },
    },
    {
        path: '/authentication/resetpassword',
        name: 'ResetPassword',
        component: ResetPassword,
        meta: {
            title: 'ResetPassword | Cuba - Premium Admin Template',
        },
    },
];

const router = new Router({
    routes,
    base: process.env.BASE_URL,
    mode: 'history',
    linkActiveClass: 'active',
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
});

router.beforeEach((to, from, next) => {
    firebase.auth().onAuthStateChanged(() => {
        if (to.meta.title) document.title = to.meta.title;
        // const CurrentUser = firebase.auth().currentUser;
        const path = ['/auth/login', '/auth/register'];
        if (path.includes(to.path) || to.path === '/callback' || Userauth.isAuthenticatedJWTUser()) {
            return next();
        }

        next('/auth/login');
        return next();
    });
});

export default router;
