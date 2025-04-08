<script setup>
	// Load stored codes from local storage if available
	const storedCodes = typeof localStorage !== "undefined" ? JSON.parse(localStorage.getItem("excluCodes")) || {} : {};
	const excluCodes = ref(storedCodes); // Store entered codes for each season

	const { data } = await useAsyncData("allData", () => $fetch("/api/serie"));

	const currentCategory = ref("serie");
	const currentSeason = ref(1);

	const isClient = ref(false);

	onMounted(() => {
		isClient.value = true; // Ensure this runs only on the client
	});

	const isExcluSeasonLocked = computed(() => {
		if (!isClient.value) return false; // Avoid mismatch during server-side rendering
		const excluSeason = data.value.exclu.find((season) => season.season === currentSeason.value);
		return excluSeason?.code && excluSeason.code !== excluCodes.value[currentSeason.value]?.join("");
	});

	const unlockExcluSeason = (code) => {
		excluCodes.value[currentSeason.value] = code.split(""); // Update the entered code for the current season
		// Save updated codes to local storage if available
		if (typeof localStorage !== "undefined") {
			localStorage.setItem("excluCodes", JSON.stringify(excluCodes.value));
		}
	};

	const handleCodeInput = (index, value) => {
		if (!excluCodes.value[currentSeason.value]) {
			excluCodes.value[currentSeason.value] = [];
		}
		excluCodes.value[currentSeason.value][index] = value;
		if (value && index < 3) {
			// Automatically focus the next input
			const nextInput = document.querySelectorAll(".input")[index + 1];
			if (nextInput) nextInput.focus();
		}
		unlockExcluSeason(excluCodes.value[currentSeason.value].join(""));
	};

	const handleBackspace = (index, event) => {
		if (!excluCodes.value[currentSeason.value]) return;
		if (!excluCodes.value[currentSeason.value][index] && index > 0) {
			// Move focus to the previous input if the current one is empty
			const prevInput = document.querySelectorAll(".input")[index - 1];
			if (prevInput) prevInput.focus();
		} else {
			// Clear the current input
			excluCodes.value[currentSeason.value][index] = "";
			unlockExcluSeason(excluCodes.value[currentSeason.value].join(""));
		}
	};

	const items = computed(() => {
		let categoryItems;
		if (currentCategory.value === "serie") {
			categoryItems = data.value.serie;
		} else if (currentCategory.value === "interviews") {
			categoryItems = data.value.interviews;
		} else if (currentCategory.value === "exclu") {
			categoryItems = data.value.exclu; // Handle "Exclu" category
		}
		return categoryItems.find((season) => season.season === currentSeason.value)?.episodes || [];
	});

	const selectedItem = ref({
		...items.value[0],
		category: currentCategory.value,
		season: currentSeason.value,
	});

	const selectItem = (item) => {
		if (currentCategory.value === "exclu" && isExcluSeasonLocked.value) {
			alert("This season is locked. Please enter the correct code to unlock.");
			return;
		}
		// Reset all items in all categories
		[data.value.serie, data.value.interviews, data.value.exclu].forEach((category) => {
			category.forEach((season) => {
				season.episodes.forEach((episode) => {
					episode.active = false;
				});
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
		const otherCategories = {
			serie: data.value.interviews, // Exclude "exclu"
			interviews: data.value.serie, // Exclude "exclu"
			exclu: [], // No matching items for "exclu"
		};
		const otherCategory = otherCategories[selectedItem.value.category];
		return otherCategory.some(
			(season) =>
				season.season === selectedItem.value.season &&
				season.episodes.some((ep) => ep.episode === selectedItem.value.episode)
		);
	});

	const selectMatchingItem = () => {
		const otherCategories = {
			serie: data.value.interviews, // Exclude "exclu"
			interviews: data.value.serie, // Exclude "exclu"
			exclu: [], // No matching items for "exclu"
		};
		const otherCategory = otherCategories[selectedItem.value.category];
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
					selectedItem.value.category === "serie"
						? data.value.serie
						: selectedItem.value.category === "interviews"
						? data.value.interviews
						: data.value.exclu
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
					selectedItem.value.category === "serie"
						? data.value.serie
						: selectedItem.value.category === "interviews"
						? data.value.interviews
						: data.value.exclu
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
		const currentCategoryItems =
			selectedItem.value.category === "serie"
				? data.value.serie
				: selectedItem.value.category === "interviews"
				? data.value.interviews
				: data.value.exclu;
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
		const currentCategoryItems =
			selectedItem.value.category === "serie"
				? data.value.serie
				: selectedItem.value.category === "interviews"
				? data.value.interviews
				: data.value.exclu;
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
		const categoryItems =
			currentCategory.value === "serie"
				? data.value.serie
				: currentCategory.value === "interviews"
				? data.value.interviews
				: data.value.exclu;
		if (!categoryItems.some((season) => season.season === currentSeason.value)) {
			currentSeason.value = 1;
		}
	});

	watch(currentSeason, () => {
		const categoryItems =
			currentCategory.value === "serie"
				? data.value.serie
				: currentCategory.value === "interviews"
				? data.value.interviews
				: data.value.exclu;
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
				<h3
					class="text-6xl cursor-pointer flex items-center gap-2"
					:class="{ 'font-bold': currentCategory === 'exclu' }"
					@click="currentCategory = 'exclu'">
					Exclu
					<span class="material-symbols-rounded">{{ isExcluSeasonLocked ? "lock" : "lock_open" }} </span>
				</h3>
			</div>
			<div class="flex flex-col items-start gap-12 w-full">
				<div class="flex flex-col items-start gap-6 w-full">
					<div class="dropdown">
						<div tabindex="0" role="button" class="btn btn-outline">
							Season {{ currentSeason }} <span class="material-symbols-rounded">arrow_drop_down</span>
						</div>
						<ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
							<li
								v-for="season in currentCategory === 'serie'
									? data.serie
									: currentCategory === 'interviews'
									? data.interviews
									: data.exclu"
								:key="season.season">
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
					<p v-if="currentCategory === 'exclu'">
						Hidden clues are embedded in episodes of “Coach Like a Woman”. Uncover secrets, and gain access to
						exclusive behind-the-scenes content and special episode!
					</p>
					<p :class="{ 'text-secondary': currentCategory === 'exclu' }">
						{{
							currentCategory === "serie"
								? data.serie.find((season) => season.season === currentSeason)?.description
								: currentCategory === "interviews"
								? data.interviews.find((season) => season.season === currentSeason)?.description
								: data.exclu.find((season) => season.season === currentSeason)?.description
						}}
					</p>
				</div>
				<div v-if="currentCategory === 'exclu' && isExcluSeasonLocked" class="flex flex-col items-start w-full">
					<p>Enter the code here:</p>
					<div class="flex justify-center gap-4 mt-4 w-full">
						<input
							type="text"
							class="input input-secondary text-center w-24 h-24 text-xl text-neutral"
							maxlength="1"
							v-for="index in 4"
							:key="index"
							:value="excluCodes[currentSeason]?.[index - 1] || ''"
							@input="handleCodeInput(index - 1, $event.target.value)"
							@keydown.backspace="handleBackspace(index - 1, $event)" />
					</div>
				</div>
				<div
					v-if="!(currentCategory === 'exclu' && isExcluSeasonLocked)"
					class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
					<template v-for="item in items" :key="item.episode">
						<div class="flex flex-col items-start gap-4" @click="!item.active && selectItem(item)">
							<BaseCard
								:title="item.title"
								:imageSrc="item.imageSrc"
								:time="item.time"
								:active="item.active"
								:numEpisode="item.episode" />
						</div>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>
