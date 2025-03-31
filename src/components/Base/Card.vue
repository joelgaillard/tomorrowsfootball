<script setup>
	import { defineProps } from "vue";

	const props = defineProps({
		active: {
			type: Boolean,
			default: false,
		},
		title: {
			type: String,
			default: "Card Title",
		},
		imageSrc: {
			type: String,
			default: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
		},
		time: {
			type: String,
			default: "12",
		},
	});
</script>

<template>
	<div class="card bg-base-100 w-full max-w-96 shadow-sm">
		<figure class="rounded-box">
			<img :src="imageSrc" alt="Shoes" class="rounded-box" />
		</figure>
		<div class="flex flex-row justify-between px-3 py-2">
			<p :class="{ 'font-bold': active }">{{ title }}</p>
			<p :class="{ 'font-bold': active }">{{ time }}min.</p>
		</div>
	</div>
</template>
