export default {
	strict: false,
	namespaced: true,

	state: {
		currentIndex: 'journal',
		allRecords: "",
	},

	getters: {
		currentCollectionName(state) {
			return "Journals";
		},
		currentCollectionColumns(state) {
			return ['title'];
		},
		currentCollectionAll(state, getters) {
			const indexData = state.allRecords.map(row => {
				const id = row.ref.value ? row.ref.value.id : row.ref["@ref"].id;
				let item = {
					id: id,
					createdAt: row.ts/1000,
				};
				getters.currentCollectionColumns.forEach(column => {
					item[column] = row.data[column]
				});
				return item;
			});
			return indexData;
		},
	},

	mutations: {
		setAllCollectionData(state, payload) {
			state.allRecords = payload;
		},
	},

	actions: {
		setCurrentCollection(context, payload) {
			const getJournals = require("../../models/JournalsModel").getJournals;
			getJournals()
				.then(resp => {
					console.log("Got journals from DB", resp.data);
					context.commit("setAllCollectionData", resp.data);
				})
				.catch(err => console.error("problem getting journals", err));
		},
	}
};
