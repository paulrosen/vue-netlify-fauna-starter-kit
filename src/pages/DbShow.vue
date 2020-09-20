<template>
	<main class="db-index">
		<h2>{{currentCollectionName()}} {{currentRow().id}}</h2>

		<table>
			<tr v-for="col in currentCollectionColumns()" :key="col">
				<td>{{col}}</td>
				<td>{{currentRow()[col]}}</td>
			</tr>
			<tr>
				<td>Created At</td>
				<td>{{formatTime(currentRow().createdAt)}}</td>
			</tr>
		</table>
	</main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
	name: "db-index",
	beforeMount() {
		this.setCurrentRow({ collection: "journals", id: this.$router.currentRoute.params.id});
	},
	methods: {
		...mapGetters("collections", ['currentCollectionName', 'currentRow', 'currentCollectionColumns']),
		...mapActions("collections", ['setCurrentRow']),

		formatTime(ts) {
			return new Date(ts);
		}
	},
}
</script>

<style lang="scss" scoped>
</style>
