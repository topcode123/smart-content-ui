<template>
    <div>
        <!-- page-wrapper Start-->
        <div class="container-fluid p-0">
            <div class="row m-0">
                <div class="col-12 p-0">
                    <div class="login-card">
                        <div>
                            <div>
                                <a class="logo">
                                    <img
                                        class="img-fluid for-light"
                                        src="../assets/images/logo/login.png"
                                        alt="looginpage"
                                    />
                                    <img
                                        class="img-fluid for-dark"
                                        src="../assets/images/logo/logo_dark.png"
                                        alt="looginpage"
                                    />
                                </a>
                            </div>
                            <div class="login-main">
                                <b-tabs
                                    pills
                                    vertical
                                >
                                    <b-tab>
                                        <b-card-text>
                                            <form
                                                class="theme-form"
                                                @submit.prevent="handleSubmit"
                                            >
                                                <div class="form-group">
                                                    <label for="username">Username</label>
                                                    <input
                                                        type="text"
                                                        v-model="username"
                                                        name="username"
                                                        class="form-control"
                                                        :class="{ 'is-invalid': submitted && !username }"
                                                    />
                                                    <div
                                                        v-show="submitted && !username"
                                                        class="invalid-feedback"
                                                    >
                                                        Username is required
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label htmlFor="password">Password</label>
                                                    <input
                                                        type="password"
                                                        v-model="passwordjwt"
                                                        name="password"
                                                        class="form-control"
                                                        :class="{
                                                            'is-invalid': submitted && !passwordjwt,
                                                        }"
                                                    />
                                                    <div
                                                        v-show="submitted && !passwordjwt"
                                                        class="invalid-feedback"
                                                    >
                                                        Password is required
                                                    </div>
                                                </div>
                                                <div class="form-group mt-3 mb-0">
                                                    <button
                                                        class="btn btn-primary btn-block"
                                                        :disabled="loggingIn"
                                                    >
                                                        Login
                                                    </button>
                                                </div>
                                                <p class="mt-4 mb-0">
                                                    Don't have account?
                                                    <router-link
                                                        class="ml-2"
                                                        tag="a"
                                                        to="/auth/register"
                                                    >
                                                        Create Account
                                                    </router-link>
                                                </p>
                                            </form>
                                        </b-card-text>
                                    </b-tab>
                                </b-tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- latest jquery-->
    </div>
</template>

<script>
import Userauth from '../auth/js/index';

export default {
    name: 'login',
    data() {
        return {
            type: 'password',
            email: 'test@admin.com',
            password: 'test@123456',
            username: '',
            passwordjwt: '',
            submitted: false,
        };
    },
    computed: {
        // JWT authentication
        loggingIn() {
            return this.$store.state.authentication.status.loggingIn;
        },
    },
    created() {
        // reset login status for JWT
        this.$store.dispatch('authentication/logout');
    },
    methods: {
        // JWT authentication
        handleSubmit() {
            this.submitted = true;
            const { username, passwordjwt } = this;
            const { dispatch } = this.$store;
            if (username && passwordjwt) {
                dispatch('authentication/login', { username, passwordjwt });
            }
        },
        // show/hide password
        showPassword: function () {
            if (this.type === 'password') {
                this.type = 'text';
            } else {
                this.type = 'password';
            }
        },
        login() {
            Userauth.login();
        },
    },
};
</script>
