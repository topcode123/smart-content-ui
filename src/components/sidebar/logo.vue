<template>
    <router-link to="/">
        <img
            class="img-fluid for-light logo-momd"
            src="../../assets/images/logo/logo.png"
            alt=""
        />
        <img
            class="img-fluid for-dark"
            src="../../assets/images/logo/logo_dark.png"
            alt=""
        />
    </router-link>
</template>
<script>
export default {
    name: 'Logo',
};
</script>
<style scoped>
.logo-momd {
    max-width: 80%;
}
</style>
