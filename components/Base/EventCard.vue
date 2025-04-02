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
  router.push(`/events/${props.id}`);
};

</script>

<template>
  <div class="card bg-base-100 shadow-sm w-full">
    <figure>
      <img :src="image_url" :alt="title" />
    </figure>
    <div class="card-body">
      <div class="flex flex-row gap-5">
        <div> {{ date }}</div>
        <div> {{ place }}</div>
      </div>
      <h2 class="text-4xl">{{ title }}</h2>
      <div class="card-actions justify-end">
        <button class="btn btn-primary" @click="goToEvent">Learn more</button>
      </div>
    </div>
  </div>
</template>