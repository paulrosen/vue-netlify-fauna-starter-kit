<template>
	<div class="dropdown-menu">
		<button @click="toggleDropdown">
			{{ label }}
			<span :class="arrowClass">►</span>
		</button>
		<ul v-if="isOpen" class="menu">
			<li v-for="item in menu" :key="item.label"><a :href="item.to ? item.to : '#'"
														  @click.prevent="doAction(item)">{{ item.label }}</a></li>
		</ul>
	</div>
</template>

<script>
export default {
	name: "dropdown-menu",
	props: {
		label: {
			type: String,
			required: true,
		},
		menu: {
			type: Array,
			required: false
		}
	},
	data() {
		return {
			isOpen: false,
		};
	},
	computed: {
		arrowClass() {
			let k = ['arrow'];
			if (this.isOpen)
				k.push("open");
			return k.join (" ");
		},
	},
	methods: {
		toggleDropdown() {
			this.isOpen = !this.isOpen;
		},
		doAction(item) {
			if (item.action) {
				item.action();
			} else
				this.$router.push(item.to);
		},
	}
}
</script>

<style lang="scss" scoped>
.dropdown-menu {
	position: relative;
}

button {
	background: transparent;
	border: none;
	font-size: 1em;
}

.arrow {
	display: inline-block;

	&.open {
		transform: rotate(90deg);
	}
}

ul {
	position: absolute;
	right: 20px;
	list-style: none;
	margin: 0;
	padding: 10px;
	background-color: #eee;
}
li {
	padding: 10px;
}
</style>
