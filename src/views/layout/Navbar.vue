<template>
	<el-menu class="navbar" mode="horizontal">
		<span class="toggle_sidebar" @click="toggleSideBar">
			<i class="fa fa-bars"></i>
		</span>
		<levelbar></levelbar>
		<el-dropdown class="avatar-container" trigger="click">
			<div class="avatar-wrapper">
				<!-- <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'"> -->
				<img class="user-avatar">
				<i class="el-icon-caret-bottom"></i>
			</div>
			<el-dropdown-menu class="user-dropdown" slot="dropdown">
				<router-link class='inlineBlock' to="/user">
					<el-dropdown-item>
						个人中心
					</el-dropdown-item>
				</router-link>
				<el-dropdown-item divided><span @click="logout" style="display:block;">退出登录</span></el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</el-menu>
</template>

<script>
  import Levelbar from './Levelbar';
  // import TabsView from './TabsView';
  // import errLogStore from 'store/errLog';
	import { mapGetters } from 'vuex';
  export default {
    components: {
      Levelbar,
      // TabsView,
    },
    data() {
      return {

      }
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('toggleSideBar')
      },
      logout() {
				this.$confirm('是否退出？','提示', {
					confirmButtonText: '确定',
					 cancelButtonText: '取消',
					 type: 'warning'
				}).then(() => {
					this.$store.dispatch('LogOut').then(() => {
						// 为了重新实例化vue-router对象 避免bug
	          location.reload()
	        })
				})
      }
    },
		computed: {
			...mapGetters([
				'user'
			])
		}
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.navbar {
			height: 50px;
			line-height: 50px;
			border-radius: 0px !important;
			.toggle_sidebar {
				display: inline-block;
				width: 50px;
				height: 50px;
				position: relative;
				top: -18px;
				text-align: center;
				margin-left: 10px;
				cursor: pointer;
				i {
					font-size: 20px;
					color: #48576a;
					line-height: 50px;
				}
			}
			.avatar-container {
					height: 50px;
					display: inline-block;
					position: absolute;
					right: 35px;
					.avatar-wrapper {
							cursor: pointer;
							margin-top: 5px;
							position: relative;
							.user-avatar {
									width: 40px;
									height: 40px;
									border-radius: 10px;
							}
							.el-icon-caret-bottom {
									position: absolute;
									right: -20px;
									top: 25px;
									font-size: 12px;
							}
					}
			}
	}
</style>
