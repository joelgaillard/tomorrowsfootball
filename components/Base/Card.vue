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
			default: "img/serie/Generique.png",
		},
		time: {
			type: String,
			default: "12",
		},
		numEpisode: {
			type: Number,
			default: 1,
		},
	});
</script>

<template>
	<div class="card bg-base-200 w-full shadow-sm" :class="{ 'bg-base-300': active, 'cursor-pointer': !active }">
		<figure class="rounded-box relative">
			<img :src="imageSrc" alt="Shoes" class="rounded-box opacity-70" />
			<p v-if="!active" class="material-symbols-rounded">
				<span class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl md:text-7xl">play_circle</span>
			</p>
		</figure>
		<div>
			<p class="text-sm text-gray-500 pt-2 pl-3">Episode {{ numEpisode }}</p>
			<div class="flex flex-row justify-between px-3 pb-2">
				<p :class="{ 'font-bold': active }">{{ title }}</p>
				<p :class="{ 'font-bold': active }">{{ time }}</p>
			</div>
		</div>
	</div>
</template>
