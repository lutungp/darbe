<template>
  <b-collapse class="sidebar-collapse" id="sidebar-collapse" :visible="sidebarOpened">
  <nav
    :class="{sidebar: true}"
  >
    <header class="logo">
      <router-link to="/app">Darbe <span class="fw-semi-bold" style="color: #ffae34;">Coin</span></router-link>
    </header>
    <ul class="nav">
      <NavLink
              :activeItem="activeItem"
              header="Dashboard"
              link="/app/dashboard"
              iconName="flaticon-home"
              index="dashboard"
              isHeader
      />
      <div v-for="element in dataSidebar" style="width: 100%;">
        <NavLink
            :activeItem="activeItem"
            :header="element.header"
            :link="element.link"
            :iconName="element.iconName"
            :index="element.index"
            :childrenLinks="element.childrenLinks"
          />
      </div>
    </ul>
  </nav>
  </b-collapse>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import NavLink from './NavLink/NavLink';

export default {
  name: 'Sidebar',
  components: { NavLink },
  data() {
    return {
      alerts: [
        {
          id: 0,
          title: 'Sales Report',
          value: 15,
          footer: 'Calculating x-axis bias... 65%',
          color: 'primary',
        },
        {
          id: 1,
          title: 'Personal Responsibility',
          value: 20,
          footer: 'Provide required notes',
          color: 'danger',
        },
      ],
    };
  },
  methods: {
    ...mapActions('layout', ['changeSidebarActive', 'switchSidebar']),
    setActiveByRoute() {
      const paths = this.$route.fullPath.split('/');
      paths.pop();
      this.changeSidebarActive(paths.join('/'));
    },
  },
  created() {
    this.setActiveByRoute();
  },
  computed: {
    ...mapState('layout', {
      sidebarOpened: state => !state.sidebarClose,
      activeItem: state => state.sidebarActiveElement,
    }),

    ...mapState('menu', {
      dataSidebar: state => state.dataSidebar
    }),
  },
};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
