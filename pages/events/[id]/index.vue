<script setup lang="ts">
const route = useRoute();

const id = 8;
const realId = route.params.id;

const { data: realEvent, error } = await useAsyncData(`event-${realId}`, () =>
  $fetch(`/api/events/${realId}`)
);

if (!realEvent.value || error.value) {
  throw createError({ statusCode: 404, message: "Event not found" });
}

const { data: event } = await useAsyncData("event", () =>
  $fetch("/api/events/" + id)
);

const { data: allEvents } = await useAsyncData("allEvents", () =>
  $fetch("/api/events")
);

const otherEvents = allEvents.value
  .filter((event: any) => event.id !== realId)
  .map((event: any) => ({
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
  if (selectedRegions.value.length === 0) return otherEvents;
  return otherEvents.filter((event) =>
    selectedRegions.value.includes(event.place)
  );
});

const resetSelection = () => {
  selectedRegions.value = [];
};
</script>

<template>
  <div v-if="event && realEvent" class="flex flex-col gap-16 py-32 px-8">
    <h1 class="text-5xl md:text-7xl font-bold">{{ realEvent.title }}</h1>
    <div class="flex flex-col gap-8">
      <div class="flex flex-col gap-5 md:flex-row">
        <BaseImg
          :src="realEvent.image_url"
          :alt="realEvent.title"
          wrapper-class="md:w-1/2"
          img-class="rounded-2xl md:h-96 object-top object-cover w-full"
          sizes="100vw md:50vw"
          format="webp"
          loading="lazy"
          :copyright="realEvent.image_copyright"
        />
        <div class="flex flex-col gap-12 md:w-1/2">
          <div class="flex flex-col gap-4">
            <div class="text-2xl md:text-4xl font-bold">
              {{ formatDate(realEvent.date) }} - {{ realEvent.place }}
            </div>
            <p class="text-lg md:text-2xl">
              {{ realEvent.desc ? realEvent.desc : event.desc }}
            </p>
          </div>
          <NuxtLink
            class="btn btn-primary md:self-end"
            :to="`/events/${realId}/register`"
          >
            Register
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-8">
      <h2 class="text-4xl md:text-6xl font-bold">Planning</h2>

      <div class="flex flex-col gap-12 md:flex-row text-lg md:text-2xl">
        <div class="flex flex-col gap-8 md:w-1/2">
          <div>
            <p class="">Duration : {{ event.duration }}</p>
            <p class="text-lg md:text-2xl">Venue : {{ event.address }}</p>
          </div>

          <div
            v-for="(item, index) in event.planning"
            :key="index"
            class="flex flex-col"
          >
            <p class="font-bold">{{ item.time }} - {{ item.title }}</p>
            <p v-if="item.subtitle">{{ item.subtitle }}</p>
            <ul class="list-disc pl-4">
              <li
                v-for="(desc, descIndex) in item.description"
                :key="descIndex"
              >
                {{ desc }}
              </li>
            </ul>
          </div>
        </div>
        <div class="md:w-1/2">
          <BaseMap
            :addressOrUrl="
              realEvent.address ? realEvent.address : realEvent.place
            "
          ></BaseMap>
        </div>
      </div>
      <NuxtLink
        class="btn btn-primary md:self-end"
        :to="`/events/${realId}/register`"
      >
        Register
      </NuxtLink>
    </div>
    <div v-if="otherEvents" class="flex flex-col gap-8">
      <div
        class="flex flex-col flex-wrap justify-between md:items-center md:flex-row"
      >
        <h2 class="text-4xl md:text-6xl font-bold">Other events</h2>
        <details class="dropdown w-full md:w-auto items-center">
          <summary
            class="btn text-lg md:text-2xl border-neutral flex justify-between items-center px-4"
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
