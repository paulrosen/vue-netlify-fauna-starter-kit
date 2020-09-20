<template>
	<footer class="footer-area">
		CRUD Example using Netlify/Identity/FaunaDB/Vue
		Modified by <a href="https://paulrosen.net">Paul Rosen</a> from <a href="https://dev.to/chiubaca/build-a-serverless-crud-app-using-vue-js-netlify-and-faunadb-5dno">Alex Chiu</a>
	</footer>
</template>

<script>
export default {
	name: "footer-area"
};
</script>

<style lang="scss" scoped>
footer {
	display: flex;
	align-items: center;
	height: 35px;
	color: black;
	background-color: var(--app-secondary-background-color);
	padding-left: 10px;
}
a {
	padding: 0 5px;
}
</style>
