<template>
	<main class="db-index">
		<h2>{{currentCollectionName()}} {{currentRow().id}}</h2>

		<form @submit.prevent="onUpdate">
			<div class="edit-item" v-for="col in currentCollectionColumns()" :key="col">
				<label>
					{{col}}:
					<input v-model="record[col]" type="text">
				</label>
			</div>
			<button>Update</button>
		</form>
	</main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {updateJournalTitle} from "../models/JournalsModel";
export default {
	name: "db-index",
	data() {
		return {
			record: {}
		};
	},
	beforeMount() {
		this.setCurrentRow({ collection: "journals", id: this.$router.currentRoute.params.id});
		this.record = this.currentRow();
	},
	methods: {
		...mapGetters("collections", ['currentCollectionName', 'currentRow', 'currentCollectionColumns']),
		...mapActions("collections", ['setCurrentRow']),
		onUpdate() {
			updateJournalTitle(this.record.id, this.record.title)
				.then(() => {
					this.$router.push("/journals/index");
				})
				.catch(err => {
					console.error("problem updating journal", err);
				});
		}
	},
}
</script>

<style lang="scss" scoped>
input {
	border: none;
}
button {
	width: 100px;
}
</style>
