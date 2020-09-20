<template>
	<main class="db-new">
		<h2>New {{currentCollectionName()}}</h2>

		<form @submit.prevent="onUpdate">
			<div class="edit-item" v-for="col in currentCollectionColumns()" :key="col">
				<label>
					{{col}}:
					<input v-model="record[col]" type="text">
				</label>
			</div>
			<button>Create</button>
		</form>
	</main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {createJournal, updateJournalTitle} from "../models/JournalsModel";
export default {
	name: "db-new",
	data() {
		return {
			record: {}
		};
	},
	beforeMount() {
		this.setCurrentRow({ collection: "journals", id: this.$router.currentRoute.params.id});
	},
	methods: {
		...mapGetters("collections", ['currentCollectionName',  'currentCollectionColumns']),
		...mapActions("collections", ['setCurrentRow']),
		onUpdate() {
			createJournal(this.record)
				.then(resp => {
					console.log("journal obj", resp);
					if (resp.msg) {
						alert(resp.message);
					}
					this.$router.push("/journals/index");
				})
				.catch(err => {
					alert("There was a problem creating your journal");
					console.error(err);
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
