<template>
	<div class="app-background">
		<nav-bar/>

		<div class="content">
		<router-view/>
		</div>

		<footer-area></footer-area>
	</div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import FooterArea from "./components/FooterArea";

export default {
	components: {
		FooterArea,
		NavBar,
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "./assets/styles/main.scss";
.app-background {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
.content {
	height: calc(100vh - 97px);
	overflow: auto;
}
</style>
