<template>
	<a-layout id="app">
		<a-layout-sider :trigger="null"
										collapsible
										v-model="collapsed">
			<div class="logo" />
			<a-menu theme="dark"
							mode="inline"
							:defaultSelectedKeys="['1']">
				<a-menu-item key="1">
					<a-icon type="user" />
					<span @click="$router.push('/module1')"> vue</span>
				</a-menu-item>
				<!-- <a-menu-item key="2">
					<a-icon type="video-camera" />
					<span>nav 2</span>
				</a-menu-item>
				<a-menu-item key="3">
					<a-icon type="upload" />
					<span>nav 3</span>
				</a-menu-item> -->
			</a-menu>
		</a-layout-sider>
		<a-layout>
			<a-layout-header style="background: #fff; padding: 0">
				<a-icon class="trigger"
								:type="collapsed ? 'menu-unfold' : 'menu-fold'"
								@click="()=> collapsed = !collapsed" />
				{{$store.state.userid}}
			</a-layout-header>
			<a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
				<div id="single-spa-vue">
					<div v-for="(item,index) in manifests"
							 :key="index"
							 :id='item.name'></div>
				</div>
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>
<script>
	export default {
		data() {
			return {
				collapsed: false
			};
		},
		computed: {
			manifests() {
				return window.WORK_SPACE_MANIFEST.components
			}
    },
    created() {
      console.log(this.$store)
    },
	};
</script>
<style lang="less">
	#app {
		width: 100%;
		height: 100%;
	}
	#app .trigger {
		font-size: 18px;
		line-height: 64px;
		padding: 0 24px;
		cursor: pointer;
		transition: color 0.3s;
	}

	#app .trigger:hover {
		color: #1890ff;
	}

	#app .logo {
		height: 32px;
		background: rgba(255, 255, 255, 0.2);
		margin: 16px;
	}
</style>