<script setup lang="ts">
const { data: allEvents } = await useAsyncData("allEvents", () =>
  $fetch("/api/events")
);

const nextEvent = ref(null);

if (allEvents.value && allEvents.value.length > 0) {
  const nextEventId = allEvents.value[0].id;
  const { data: nextEventData } = await useFetch(`/api/events/${nextEventId}`);
  nextEvent.value = nextEventData.value;
}

const otherEvents = allEvents.value.slice(1).map((event: any) => ({
  id: event.id,
  title: event.title,
  date: event.date,
  place: event.place,
  image_url: event.image_url,
  image_copyright: event.image_copyright,
}));

const selectedRegions = ref<string[]>([]);

const availableRegions = computed(() => {
  const regions = otherEvents.map((event) => event.place);
  return [...new Set(regions)];
});

const filteredEvents = computed(() => {
  if (selectedRegions.value.length === 0) return otherEvents; // Afficher tout si aucune sélection
  return otherEvents.filter((event) =>
    selectedRegions.value.includes(event.place)
  );
});

const resetSelection = () => {
  selectedRegions.value = [];
};
</script>

<template>
  <div class="flex flex-col gap-16 py-32 px-8">
    <h1 class="text-7xl font-bold">Events</h1>
    <div v-if="nextEvent" class="flex flex-col gap-8">
      <h2 class="text-6xl font-bold">Next event</h2>
      <div class="flex flex-col gap-5 md:flex-row">
        <BaseImg
          :src="nextEvent.image_url"
          :alt="nextEvent.title"
          wrapper-class="md:w-1/2"
          img-class="rounded-2xl md:h-96 object-top object-cover w-full"
          sizes="100vw md:50vw"
          format="webp"
          loading="lazy"
          :copyright="nextEvent.image_copyright"
          />

        <div class="flex flex-col gap-12 md:w-1/2">
          <div class="flex flex-col gap-4">
            <div class="text-4xl font-bold">{{ nextEvent.title }}</div>
            <div class="text-3xl font-bold">
              {{ formatDate(nextEvent.date) }} - {{ nextEvent.place }}
            </div>
            <p class="text-2xl">{{ nextEvent.desc }}</p>
          </div>
          <div class="flex gap-4">
            <NuxtLink
              class="btn btn-primary btn-outline"
              :to="`/events/${nextEvent.id}`"
            >
              More details
            </NuxtLink>
            <NuxtLink
              class="btn btn-primary"
              :to="`/events/${nextEvent.id}/register`"
            >
              Register
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div v-if="otherEvents" class="flex flex-col gap-8">
      <div
        class="flex flex-col flex-wrap justify-between md:items-center md:flex-row"
      >
        <h2 class="text-6xl font-bold">Other events</h2>
        <details class="dropdown w-full md:w-auto items-center">
          <summary
            class="btn text-2xl border-neutral flex justify-between items-center px-4"
          >
            <span class="text-left">Filter by region</span>
            <span
              class="material-symbols-rounded"
              :class="{ 'text-primary font-bold': selectedRegions.length > 0 }"
            >
              filter_alt
            </span>
          </summary>
          <ul
            class="menu dropdown-content bg-base-100 rounded-box z-10 w-full left-0 p-2 shadow-lg absolute"
          >
            <li
              v-for="region in availableRegions"
              :key="region"
              class="flex gap-2 px-2 py-1"
            >
              <label
                :for="region"
                class="cursor-pointer flex items-center gap-2 w-full"
              >
                <input
                  type="checkbox"
                  :id="region"
                  :value="region"
                  v-model="selectedRegions"
                  class="w-4 h-4"
                />
                {{ region }}
              </label>
            </li>
            <li class="mt-2">
              <button
                class="btn btn-primary btn-outline w-full"
                @click="resetSelection"
              >
                Reset
              </button>
            </li>
          </ul>
        </details>
      </div>
      <div
        class="grid grid-cols-1 gap-x-5 gap-y-16 md:grid-cols-2 lg:grid-cols-4"
      >
        <BaseEventCard
          v-for="event in filteredEvents"
          :key="event.id"
          :id="event.id"
          :title="event.title"
          :date="event.date"
          :place="event.place"
          :image_url="event.image_url"
          :image_copyright="event.image_copyright"
        />
      </div>
    </div>
  </div>
</template>
