<template>
	<div class="about">
		<h1>{{manifest}}</h1>
	</div>
</template>
<script>
	export default {
		computed: {
      manifest(){
        return window  //eslint-disable-line
      }
		}
	}
</script>
