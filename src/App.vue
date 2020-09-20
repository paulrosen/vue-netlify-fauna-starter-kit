<template>
	<div class="app-background">
		<nav-bar/>

		<router-view/>

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
  justify-content: space-between;
}
</style>
