<template>
	<main class="db-index">
		<h2>All {{currentCollectionName()}}</h2>
		<table>
			<tr>
				<th v-for="col in currentCollectionColumns()" :key="col">{{col}}</th>
			</tr>
			<tr v-for="row in currentCollectionAll()" :key="row.id">
				<td v-for="col in currentCollectionColumns()" :key="col">{{row[col]}}
				</td>
				<td>{{formatTime(row.createdAt)}}</td>
				<td>Show Edit Delete</td>
			</tr>
		</table>
	</main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
	name: "db-index",
	beforeMount() {
		this.setCurrentCollection("journals")
	},
	methods: {
		...mapGetters("collections", ['currentCollectionName', 'currentCollectionAll', 'currentCollectionColumns']),
		...mapActions("collections", ['setCurrentCollection']),

		formatTime(ts) {
			return new Date(ts);
		}
	},
}
</script>

<style lang="scss" scoped>

</style>
