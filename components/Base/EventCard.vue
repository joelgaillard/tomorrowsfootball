<script setup>
const router = useRouter();

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
});

const goToEvent = () => {
  router.push("/events/" + props.id);
};
</script>

<template>
  <div class="flex flex-col card bg-base-200 shadow-sm w-full gap-8 h-full">
    <div>
      <NuxtImg
        :src="image_url"
        :alt="title"
        class="w-full h-60 object-right-top object-cover rounded-2xl"
        sizes="100vw md:25vw"
        format="webp"
        loading="lazy"
      />
    </div>
    <div class="flex flex-col flex-grow">
      <div class="flex flex-row gap-5">
        <div>{{ date }}</div>
        <div>{{ place }}</div>
      </div>
      <h2 class="text-4xl">{{ title }}</h2>
    </div>
    <div class="flex justify-end">
      <button class="btn btn-primary w-auto self-end" @click="goToEvent">
        Learn more
      </button>
    </div>
  </div>
</template>
