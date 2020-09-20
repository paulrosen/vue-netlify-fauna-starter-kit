<template>
	<div class="confirmation-dlg">
		<div class="modal-shadow" @keyup.esc="$emit('cancel')">
			<div class="contents">
			<h2>{{ title }}</h2>
			<p>{{ question }}</p>
			<div class="button-row">
				<button @click="$emit('cancel')">Cancel</button>
				<button @click="$emit('ok')">Ok</button>
			</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "confirmation-dlg",
	components: {},
	props: {
		title: {
			type: String,
			required: true
		},
		question: {
			type: String,
			required: true
		},
	},
}
</script>

<style lang="scss" scoped>
.modal-shadow {
	background-color: #3d3b3b5b;
	position: fixed;
	padding: 2em;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	height: 100%;
	z-index: 1;
}

.modal-shadow .modal-contents {
	max-height: 35rem;
	padding: 1rem;
	background-color: var(--app-secondary-background-color);
	box-shadow: 0px 0px 13px #7d7d7d;
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	overflow-x: auto;
}

.contents {
	background-color: var(--app-secondary-background-color);
	display: inline-block;
	padding: 50px;
}
</style>
