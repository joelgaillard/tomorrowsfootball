<script setup>
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
	<div class="card bg-base-100 w-full shadow-sm" :class="{ 'bg-base-200': active, 'cursor-pointer': !active }">
		<figure class="rounded-box relative">
			<img :src="imageSrc" alt="Shoes" class="rounded-box opacity-70" />
			<p v-if="!active" class="material-symbols-rounded">
				<span class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl"
					>play_circle</span
				>
			</p>
		</figure>
		<div class="flex flex-row justify-between px-3 py-2">
			<p :class="{ 'font-bold': active }">{{ title }}</p>
			<p :class="{ 'font-bold': active }">{{ time }}min.</p>
		</div>
	</div>
</template>
