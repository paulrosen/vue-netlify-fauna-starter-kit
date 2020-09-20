export default {
	strict: false,
	namespaced: true,

	state: {
		currentCollection: 'journal',
		allRecords: "",
		currentRow: 0,
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
		currentRow(state, getters) {
			if (getters.currentCollectionAll.length > state.currentRow)
				return getters.currentCollectionAll[state.currentRow];
		},
		getRecord: (state, getters) => (id) => {
			return state.allRecords.filter(record => {
				const recId = record.ref.value ? record.ref.value.id : record.ref["@ref"].id;
				return recId === id;
			});
		},
		hasChildren(state) {
			return state.currentCollection === 'journal';
		},
	},

	mutations: {
		setAllCollectionData(state, payload) {
			state.allRecords = payload;
		},
		currentRow(state, payload) {
			state.currentRow = payload;
		}
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
		setCurrentRow(context, payload) {
			context.getters.currentCollectionAll.forEach((row, index) => {
				if (row.id === payload.id)
					context.commit("currentRow", index);
			});
		},
	}
};
