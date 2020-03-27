<template>
	<div id="app">
		<div id="nav">
			module1 {{$store.state.userid}}
      <button @click="$store.state.userid+=1">加一</button>
      <button @click="$router.push('/module1/about')">about</button>
			<router-link to="/module1/">Home</router-link> |
			<router-link to="/module1/about">About</router-link>
		</div>
		<router-view />
	</div>
</template>

<script>
	export default {
	}
</script>
<style lang="less">
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}

	#nav {
		padding: 30px;

		a {
			font-weight: bold;
			color: #2c3e50;

			&.router-link-exact-active {
				color: #42b983;
			}
		}
	}
</style>
