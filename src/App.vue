<template>
  <router-view />
</template>

<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';
export default {
  name: 'App',
  methods : {
    ...mapGetters(['isAuth']),
  },

  created() {
    let me = this;
    if (!this.isAuth()) {
      me.$router.push('/login');
    }
  },
};
</script>

<style src="./styles/theme.scss" lang="scss" />
