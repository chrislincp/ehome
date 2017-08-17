<template lang="html">
  <div class="app_wrapper" :class="{hideSidebar:sidebar}">
    <sidebar class="sidebar_container"></sidebar>
    <div class="main_container">
      <navbar></navbar>
      <app-main></app-main>
    </div>

  </div>
</template>

<script>
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import AppMain from './AppMain'
export default {
  components: {
    Sidebar,
    Navbar,
    AppMain
  },
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style lang="scss">
	@import "src/styles/mixin.scss";
  .app_wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.hideSidebar {
      .sidebar_container {
        width: 64px;
      }
      .main_container {
        margin-left: 64px;
      }
    }
    .sidebar_container {
      transition: width 0.28s ease-out;
      width: 200px;
      height: 100%;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1001;
      &::-webkit-scrollbar {display:none}
    }
    .main_container {
      min-height: 100%;
			margin-left: 200px;
      transition: margin-left 0.28s ease-out;
    }
  }
</style>
