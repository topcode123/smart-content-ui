<template>
    <div class="header-wrapper row m-0">
        <SearchBar />
        <Logo />
        <div class="left-header col horizontal-wrapper pl-0">
            <ul class="horizontal-menu">
            </ul>
        </div>
        <div class="nav-right col-8 pull-right right-header p-0">
            <ul class="nav-menus">
                <Notifications />
                <Cart />
                <Profile />
            </ul>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import Notifications from './notifications';
import Cart from './cart';
import Profile from './profile';
import Logo from './logo';
import SearchBar from './search';

export default {
    name: 'Search',
    components: {
        Notifications,
        Cart,
        Profile,
        Logo,
        SearchBar,
    },
    data() {
        return {
            bookmark: false,
        };
    },
    computed: {
        ...mapState({
            menuItems: (state) => state.menu.searchData,
            megamenuItems: (state) => state.menu.megamenu,
            searchOpen: (state) => state.menu.searchOpen,
        }),
    },
    methods: {
        search_open() {
            this.$store.state.menu.searchOpen = true;
        },
        bookmark_open() {
            this.bookmark = !this.bookmark;
        },
    },
};
</script>
