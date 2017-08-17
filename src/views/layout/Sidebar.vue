<template lang="html">
  <el-menu
    mode="vertical"
    theme="dark"
    unique-opened
    :default-active="$route.path"
    :collapse="sidebar"
    router
    >
    <template v-for="(item, index) in $router.options.routes" >
        <el-menu-item
          v-if="!item.hidden&&item.children&&item.noDropdown"
          :index="`${item.path}${item.children[0].path}`"
          >
          <i v-if="item.icon" :class="item.icon"></i>
          <span>{{item.name}}</span>
        </el-menu-item>

      <el-submenu
        v-if="!item.hidden&&item.children&&!item.noDropdown"
        :index="item.path"
        >
        <template slot="title">
          <i v-if="item.icon" :class="item.icon"></i>
          <span>{{item.name}}</span>
        </template>
        <template v-for="child in item.children" v-if="!child.hidden">
          <el-menu-item :index="`${item.path}/${child.path}`">
            <span>{{child.name}}</span>
          </el-menu-item>
        </template>
			</el-submenu>
    </template>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  }
}
</script>

<style lang="scss">

</style>
