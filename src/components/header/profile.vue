<template>
    <li class="profile-nav onhover-dropdown p-0 mr-0">
        <div class="media profile-media">
            <img
                class="b-r-10"
                src="../../assets/images/dashboard/profile.jpg"
                alt=""
            />
            <div class="media-body">
                <span>{{ name }}</span>
                <p class="mb-0 font-roboto">{{ role }} <i class="middle fa fa-angle-down"></i></p>
            </div>
        </div>
        <ul class="profile-dropdown onhover-show-div">
            <li>
                <a href="#"><feather type="user"></feather><span>Account </span></a>
            </li>
            <li>
                <a @click="logout"><feather type="log-in"></feather><span>Log out</span></a>
            </li>
        </ul>
    </li>
</template>

<script>
import firebase from 'firebase';
import UserAuth from '../../auth/js/index';

export default {
    name: 'Profile',
    data() {
        return {
            name: '',
            role: '',
        };
    },
    mounted() {
        const user = this.$store.state.authentication?.user;
        this.name = user.username;
        this.role = user.role;
    },
    methods: {
        logout: function () {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    UserAuth.Logout();
                    this.$router.replace('/auth/login');
                });
        },
    },
};
</script>
