<script setup>
	const serie = ref([
		{
			id: 1,
			season: 1,
			episode: 1,
			title: "New start",
			imageSrc: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
			time: "12",
			active: true,
			description:
				"As the club will close because of lacking of a coach we follow Emily the big sister of a player who the life will be change for the better.",
		},
		{
			id: 2,
			season: 1,
			episode: 2,
			title: "The first game",
			imageSrc: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
			time: "15",
			active: false,
			description: "The team plays their first game under Emily's coaching, facing challenges and surprises.",
		},
		{
			id: 3,
			season: 2,
			episode: 1,
			title: "A new challenge",
			imageSrc: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
			time: "10",
			active: false,
			description: "Emily faces a new challenge as the team prepares for a big tournament.",
		},
	]);
	const interviews = ref([
		{
			id: 1,
			season: 1,
			episode: 1,
			title: "Interview with the coach",
			imageSrc: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
			time: "12",
			active: false,
			description: "An in-depth interview with Emily about her journey as a coach.",
		},
		{
			id: 2,
			season: 1,
			episode: 2,
			title: "Players' perspectives",
			imageSrc: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
			time: "15",
			active: false,
			description: "The players share their experiences and thoughts about the new coach.",
		},
	]);

	const currentCategory = ref("serie");
	const currentSeason = ref(1);

	const items = computed(() => {
		const categoryItems = currentCategory.value === "serie" ? serie.value : interviews.value;
		return categoryItems.filter((item) => item.season === currentSeason.value);
	});

	const selectedItem = ref({ ...items.value[0], category: currentCategory.value });

	const selectItem = (item) => {
		// Reset all items in both categories
		serie.value.forEach((i) => (i.active = false));
		interviews.value.forEach((i) => (i.active = false));
		// Set the clicked item's active property to true
		item.active = true;
		// Update the selected item
		selectedItem.value = { ...item, category: currentCategory.value };

		// Scroll to the first section
		const firstSection = document.querySelector(".flex.flex-col.items-start.gap-24.p-4.mt-16");
		if (firstSection) {
			firstSection.scrollIntoView({ behavior: "smooth" });
		}
	};

	const getDynamicTitle = (item) => {
		return `S${item.season.toString().padStart(2, "0")} E${item.episode.toString().padStart(2, "0")} - ${item.title}`;
	};

	watch(currentCategory, () => {
		currentSeason.value = 1;
	});
</script>

<template>
	<div class="flex flex-col items-start gap-24 p-4 mt-16">
		<div class="flex flex-col items-start gap-16 w-full">
			<h1 class="text-7xl font-bold">Coach like a woman</h1>
			<div class="flex flex-col items-center md:flex-row gap-4 w-full">
				<figure class="rounded-box relative md:w-1/2">
					<img :src="selectedItem.imageSrc" alt="Selected Item" class="rounded-box opacity-70" />
					<p class="material-symbols-rounded">
						<span class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl"
							>play_circle</span
						>
					</p>
				</figure>
				<div class="flex flex-col items-start gap-2 md:w-1/2">
					<p class="text-sm text-gray-500">{{ selectedItem.category }}</p>
					<h2 class="text-4xl font-bold">{{ getDynamicTitle(selectedItem) }}</h2>
					<p>{{ selectedItem.description }}</p>
					<p class="link link-primary">
						{{ selectedItem.category === "serie" ? "View full interview" : "View related episode" }}
					</p>
					<div class="flex flex-row gap-4 my-4">
						<p class="btn btn-primary btn-outline">Previous</p>
						<p class="btn btn-primary">Next</p>
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-col items-start gap-16 w-full">
			<div class="flex flex-row items-start gap-12 w-full overflow-auto">
				<h3
					class="text-6xl cursor-pointer"
					:class="{ 'font-bold': currentCategory === 'serie' }"
					@click="currentCategory = 'serie'">
					Episodes
				</h3>
				<h3
					class="text-6xl cursor-pointer"
					:class="{ 'font-bold': currentCategory === 'interviews' }"
					@click="currentCategory = 'interviews'">
					Interviews
				</h3>
			</div>
			<div class="flex flex-col items-start gap-12 w-full">
				<div class="dropdown">
					<div tabindex="0" role="button" class="btn btn-outline">
						Season {{ currentSeason }} <span class="material-symbols-rounded">arrow_drop_down</span>
					</div>
					<ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
						<li
							v-for="season in [
								...new Set((currentCategory === 'serie' ? serie : interviews).map((item) => item.season)),
							]"
							:key="season">
							<a href="#" class="flex flex-row items-center gap-2" @click.prevent="currentSeason = season">
								<span class="material-symbols-rounded" :class="{ 'text-primary': currentSeason === season }"
									>check_circle</span
								>
								<span>Season {{ season }}</span>
							</a>
						</li>
					</ul>
				</div>
				<div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
					<template v-for="item in items" :key="item.id">
						<div class="flex flex-col items-start gap-4" @click="!item.active && selectItem(item)">
							<BaseCard :title="item.title" :imageSrc="item.imageSrc" :time="item.time" :active="item.active" />
						</div>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>
