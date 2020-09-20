<template>
	<nav class="nav-bar">
		<div class="left">
			<router-link :to="{ name: 'home' }">Home</router-link>
			<h1>CRUD Example</h1>
		</div>
		<div class="right">
			<router-link v-if="currentUser" :to="{ name: 'journals' }">Orig</router-link>
			<router-link v-if="currentUser" to="/journals/index">Tunebooks</router-link>

			<dropdown-menu v-if="currentUser" :label="currentUser.user_metadata.full_name" :menu="userMenu"></dropdown-menu>
			<router-link v-if="!currentUser" :to="{ name: 'login' }">Login</router-link>
		</div>
	</nav>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import DropdownMenu from "./lib/DropdownMenu";

export default {
	components: {DropdownMenu},
	computed: {
		...mapGetters("auth", ["currentUser"]),
		userMenu() {
			return [
				{ label: "Profile", to: "/profile"},
				{ label: "Logout", action: this.logout }
			]
		}
	},
	methods: {
		...mapActions("auth", [
			"attemptLogout",
		]),
		logout() {
			this.attemptLogout()
				.then(resp => {
					alert("logged out");
					this.$router.push("home");
					console.log("logged out", resp);
				})
				.catch(error => {
					alert("problem with logout");
					location.reload();
					console.error("problem with logout", error);
				});
		},
	},
};
</script>

<style lang="scss" scoped>
nav {
	background-color: var(--app-secondary-background-color);
	display: flex;
	justify-content: space-between;
	padding: 10px;
}

h1 {
	margin: 0 0 0 10px;
	padding: 0;
	font-weight: normal;
}

.left,.right {
	display: flex;
	align-items: center;
}
.right {
	a {
		margin-left: 10px;
	}
}

//nav#nav-bar #nav-items {
//  display: flex;
//  flex-flow: wrap;
//  text-decoration: none;
//  align-items: center;
//  text-align: center;
//  justify-content: space-evenly;
//  margin: 30px 10px 0 10px;
//
//  a {
//    border-bottom: solid 3px rgba(255, 255, 255, 0);
//    padding-bottom: 5px;
//    text-decoration: none;
//    font-weight: bold;
//  }
//
//  a:hover {
//    border-bottom: solid 3px var(--primary);
//    padding-bottom: 5px;
//  }
//}
//nav#nav-bar #nav-items > a,
//div {
//  margin: 20px;
//}
</style>
