<script setup>
	const { data } = await useAsyncData("allData", () => $fetch("/api/serie"))

	const currentCategory = ref("serie");
	const currentSeason = ref(1);

	const items = computed(() => {
		const categoryItems = currentCategory.value === "serie" ? data.value.serie : data.value.interviews;
		return categoryItems.find((season) => season.season === currentSeason.value)?.episodes || [];
	});

	const selectedItem = ref({
		...items.value[0],
		category: currentCategory.value,
		season: currentSeason.value,
	});

	const selectItem = (item) => {
		// Reset all items in both categories
		data.value.serie.forEach((season) => {
			season.episodes.forEach((episode) => {
				episode.active = false;
			});
		});
		data.value.interviews.forEach((season) => {
			season.episodes.forEach((episode) => {
				episode.active = false;
			});
		});
		// Set the clicked item's active property to true
		item.active = true;
		// Update the selected item
		selectedItem.value = { ...item, category: currentCategory.value, season: currentSeason.value };

		// Scroll to the first section
		const player = document.querySelector(".player");
		if (player) {
			window.scrollTo({
				top: player.offsetTop - 120,
				behavior: "smooth",
			});
		}
	};

	const hasMatchingItem = computed(() => {
		const otherCategory = selectedItem.value.category === "serie" ? data.value.interviews : data.value.serie;
		return otherCategory.some(
			(season) =>
				season.season === selectedItem.value.season &&
				season.episodes.some((ep) => ep.episode === selectedItem.value.episode)
		);
	});

	const selectMatchingItem = () => {
		const otherCategory = selectedItem.value.category === "serie" ? data.value.interviews : data.value.serie;
		const matchingSeason = otherCategory.find((season) => season.season === selectedItem.value.season);
		const matchingItem = matchingSeason?.episodes.find((ep) => ep.episode === selectedItem.value.episode);

		if (matchingItem) {
			// Switch to the other category
			currentCategory.value = selectedItem.value.category === "serie" ? "interviews" : "serie";
			// Update the current season
			currentSeason.value = selectedItem.value.season;
			// Select the matching item
			selectItem(matchingItem);
		}
	};

	const getDynamicTitle = (item) => {
		return `S${item.season.toString().padStart(2, "0")} E${item.episode.toString().padStart(2, "0")} - ${item.title}`;
	};

	const changeEpisode = (direction) => {
		if (!selectedItem.value || !items.value) return;

		if (currentCategory.value !== selectedItem.value.category) {
			currentCategory.value = selectedItem.value.category;
		}
		if (currentSeason.value !== selectedItem.value.season) {
			currentSeason.value = selectedItem.value.season;
		}
		const currentItems = items.value;
		const currentIndex = currentItems.findIndex((item) => item.episode === selectedItem.value.episode);
		if (currentIndex === -1) return;

		let newIndex = currentIndex;

		if (direction === "next") {
			if (currentIndex === currentItems.length - 1) {
				// Check if there is a next season
				const nextSeason = (
					selectedItem.value.category === "serie" ? data.value.serie : data.value.interviews
				).find((season) => season.season === selectedItem.value.season + 1);
				if (nextSeason && nextSeason.episodes.length > 0) {
					currentSeason.value += 1;
					if (currentCategory.value !== selectedItem.value.category) {
						currentCategory.value = selectedItem.value.category;
					}
					selectItem(nextSeason.episodes[0]);
					return;
				}
			} else {
				newIndex = (currentIndex + 1) % currentItems.length;
			}
		} else if (direction === "prev") {
			if (currentIndex === 0) {
				// Check if there is a previous season
				const prevSeason = (
					selectedItem.value.category === "serie" ? data.value.serie : data.value.interviews
				).find((season) => season.season === selectedItem.value.season - 1);
				if (prevSeason && prevSeason.episodes.length > 0) {
					currentSeason.value -= 1;
					if (currentCategory.value !== selectedItem.value.category) {
						currentCategory.value = selectedItem.value.category;
					}
					selectItem(prevSeason.episodes[prevSeason.episodes.length - 1]);
					return;
				}
			} else {
				newIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
			}
		}

		selectItem(currentItems[newIndex]);
	};

	const isPrevDisabled = computed(() => {
		const currentCategoryItems = selectedItem.value.category === "serie" ? data.value.serie : data.value.interviews;
		const currentSeasonItems = currentCategoryItems.find((season) => season.season === selectedItem.value.season);
		const currentItems = currentSeasonItems?.episodes || [];
		const currentIndex = currentItems.findIndex((item) => item.episode === selectedItem.value.episode);
		if (currentIndex === 0) {
			// Check if there is a previous season
			return !currentCategoryItems.some((season) => season.season === selectedItem.value.season - 1);
		}
		return false;
	});

	const isNextDisabled = computed(() => {
		const currentCategoryItems = selectedItem.value.category === "serie" ? data.value.serie : data.value.interviews;
		const currentSeasonItems = currentCategoryItems.find((season) => season.season === selectedItem.value.season);
		const currentItems = currentSeasonItems?.episodes || [];
		const currentIndex = currentItems.findIndex((item) => item.episode === selectedItem.value.episode);
		if (currentIndex === currentItems.length - 1) {
			// Check if there is a next season
			return !currentCategoryItems.some((season) => season.season === selectedItem.value.season + 1);
		}
		return false;
	});

	watch(currentCategory, () => {
		const categoryItems = currentCategory.value === "serie" ? data.value.serie : data.value.interviews;
		if (!categoryItems.some((season) => season.season === currentSeason.value)) {
			currentSeason.value = 1;
		}
	});

	watch(currentSeason, () => {
		const categoryItems = currentCategory.value === "serie" ? data.value.serie : data.value.interviews;
		if (!categoryItems.some((season) => season.season === currentSeason.value)) {
			currentSeason.value = categoryItems[0]?.season || 1;
		}
	});
</script>

<template>
	<div class="flex flex-col items-start gap-24 p-4 mt-16">
		<div class="flex flex-col items-start gap-16 w-full">
			<h1 class="text-7xl font-bold">Coach like a woman</h1>
			<div class="player flex flex-col items-center md:flex-row gap-4 w-full">
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
					<p v-if="hasMatchingItem" class="link link-primary" @click.prevent="selectMatchingItem">
						{{ selectedItem.category === "serie" ? "View full interview" : "View related episode" }}
					</p>
					<div class="flex flex-row gap-4 my-4">
						<p
							class="btn btn-primary btn-outline"
							:class="{ 'btn-disabled': isPrevDisabled }"
							@click="!isPrevDisabled && changeEpisode('prev')">
							Previous
						</p>
						<p
							class="btn btn-primary"
							:class="{ 'btn-disabled': isNextDisabled }"
							@click="!isNextDisabled && changeEpisode('next')">
							Next
						</p>
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
						<li v-for="season in currentCategory === 'serie' ? data.serie : data.interviews" :key="season.season">
							<a
								href="#"
								class="flex flex-row items-center gap-2"
								@click.prevent="currentSeason = season.season">
								<span
									class="material-symbols-rounded"
									:class="{ 'text-primary': currentSeason === season.season }"
									>check_circle</span
								>
								<span>Season {{ season.season }}</span>
							</a>
						</li>
					</ul>
				</div>
				<div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
					<template v-for="item in items" :key="item.episode">
						<div class="flex flex-col items-start gap-4" @click="!item.active && selectItem(item)">
							<BaseCard :title="item.title" :imageSrc="item.imageSrc" :time="item.time" :active="item.active" :numEpisode="item.episode" />
						</div>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>
