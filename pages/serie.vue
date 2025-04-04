<script setup>
	const episodes = ref([
		{
			id: 1,
			title: "S01 E01 - New start",
			imageSrc: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
			time: "12",
			active: true,
			description:
				"As the club will close because of lacking of a coach we follow Emily the big sister of a player who the life will be change for the better.",
		},
		{
			id: 2,
			title: "S01 E02 - The first game",
			imageSrc: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
			time: "15",
			active: false,
			description: "The team plays their first game under Emily's coaching, facing challenges and surprises.",
		},
	]);
	const interviews = ref([
		{
			id: 1,
			title: "S01 I01 - Interview with the coach",
			imageSrc: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
			time: "12",
			active: false,
			description: "An in-depth interview with Emily about her journey as a coach.",
		},
		{
			id: 2,
			title: "S01 I02 - Players' perspectives",
			imageSrc: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
			time: "15",
			active: false,
			description: "The players share their experiences and thoughts about the new coach.",
		},
	]);

	const currentCategory = ref("episodes");

	const items = computed(() => {
		return currentCategory.value === "episodes" ? episodes.value : interviews.value;
	});

	const selectedItem = ref(items.value[0]); // Default to the first item

	const selectItem = (item) => {
		// Reset all items in both categories
		episodes.value.forEach((i) => (i.active = false));
		interviews.value.forEach((i) => (i.active = false));
		// Set the clicked item's active property to true
		item.active = true;
		// Update the selected item
		selectedItem.value = item;

		// Scroll to the first section
		const firstSection = document.querySelector(".flex.flex-col.items-start.gap-24.p-4.mt-16");
		if (firstSection) {
			firstSection.scrollIntoView({ behavior: "smooth" });
		}
	};
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
					<h2 class="text-4xl font-bold">{{ selectedItem.title }}</h2>
					<p>{{ selectedItem.description }}</p>
					<p class="link link-primary">View full interview</p>
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
					:class="{ 'font-bold': currentCategory === 'episodes' }"
					@click="currentCategory = 'episodes'">
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
				<div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
					<template v-for="item in items" :key="item.id">
						<div class="flex flex-col items-start gap-4" @click="selectItem(item)">
							<BaseCard :title="item.title" :imageSrc="item.imageSrc" :time="item.time" :active="item.active" />
						</div>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>
