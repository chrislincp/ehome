<template lang="html">
  <div class="system_config">
    <el-card class="config_card">
      <el-tabs>
        <el-tab-pane label="首页设置">
          <home></home>
        </el-tab-pane>
        <el-tab-pane label="品牌设置">
          <brands></brands>
        </el-tab-pane>
        <el-tab-pane label="产品设置">
          <products></products>
        </el-tab-pane>
        <el-tab-pane label="方案设置">
          <schemes></schemes>
        </el-tab-pane>
        <el-tab-pane label="权限设置">
          <permission></permission>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import Home from './home'
import Brands from './brands'
import Products from './products'
import Schemes from './schemes'
import Permission from './permission'
export default {
  components: {
    Home,
    Brands,
    Products,
    Schemes,
    Permission
  }
}
</script>

<style lang="scss">

  .system_config {
    padding: 10px;
    .config_card {

    }
  }
</style>
