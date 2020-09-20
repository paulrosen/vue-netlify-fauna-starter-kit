<template>
	<main class="db-index">
		<h2>All {{currentCollectionName()}}</h2>
		<table>
			<tr>
				<th v-for="col in currentCollectionColumns()" :key="col">{{col}}</th>
				<th>Created At</th>
				<th></th>
			</tr>
			<tr v-for="row in currentCollectionAll()" :key="row.id">
				<td v-for="col in currentCollectionColumns()" :key="col">{{row[col]}}
				</td>
				<td>{{formatTime(row.createdAt)}}</td>
				<td><router-link :to="`/journals/show/${row.id}`">Show</router-link> <router-link :to="`/journals/edit/${row.id}`">Edit</router-link> <button class="delete" @click="deleteRow(row)">Delete</button><router-link v-if="hasChildren()" :to="`/journals/${row.id}/posts`"> Children</router-link></td>
			</tr>
		</table>
		<router-link to="/journals/new">New</router-link>
		<confirmation-dlg v-if="confirm.show" :title="confirm.title" :question="confirm.question" @cancel="confirm.show = false" @ok="confirm.action"></confirmation-dlg>
	</main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {deleteJournal} from "../models/JournalsModel";
import ConfirmationDlg from "../components/lib/ConfirmationDlg";
export default {
	name: "db-index",
	components: {ConfirmationDlg},
	beforeMount() {
		this.setCurrentCollection("journals")
	},
	data() {
		return {
			confirm: {
				show: false,
				title: "",
				question: ""
			}
		}
	},
	methods: {
		...mapGetters("collections", ['currentCollectionName', 'currentCollectionAll', 'currentCollectionColumns', 'getRecord', 'hasChildren']),
		...mapActions("collections", ['setCurrentCollection']),

		formatTime(ts) {
			return new Date(ts);
		},
		deleteRow(row) {
			this.confirm = {
				show: true,
				title: `Delete "${row.title}"`,
				question: "Are you sure?",
				action: () => {
					const record = this.getRecord(row.id);
					deleteJournal(record)
						.then(resp => {
							console.log("Journal deleted!", resp);
						})
						.catch(err => {
							console.error("problem deleting", err);
						});
				}
			}
		},
	},
}
</script>

<style lang="scss" scoped>
td {
	padding: 5px;
}
	tr:nth-child(even) {
		background-color: #dedede;
	}
	.delete {
		display: inline-block;
		font-size: 1em;
		background: transparent;
		border: none;
		text-decoration: underline;
		text-align: left;
		padding: 0;
		width: inherit;
	}
</style>
