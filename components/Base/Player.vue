<script setup>
	import "vidstack/bundle";

	const props = defineProps({
		title: {
			type: String,
			default: "Generique",
		},
		videoSrc: {
			type: String,
			default: "video/Generique.mp4",
		},
		posterSrc: {
			type: String,
			default: "img/serie/Generique.png",
		},
	});
</script>

<template>
	<div class="flex rounded-2xl w-full lg:w-1/2 h-full overflow-hidden border border-secondary">
		<media-player :title="title" :src="videoSrc">
			<ClientOnly>
				<media-provider
					><media-poster class="vds-poster" :src="posterSrc" :alt="`Poster de l'episode ${title}`"></media-poster
				></media-provider>
				<media-video-layout small-when="never"></media-video-layout>
			</ClientOnly>
		</media-player>
	</div>
</template>
