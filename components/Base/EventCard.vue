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
  image_copyright: {
    type: String,
    default: "Tomorrow's Football",
  },
});
</script>

<template>
  <NuxtLink
    class="flex flex-col card bg-base-200 hover:bg-base-300 shadow-sm w-full gap-8 h-full"
    :to="'/events/' + id"
  >
    <div>
      <BaseImg
        :src="image_url"
        :alt="title"
        wrapper-class="w-full"
        img-class="h-60 object-right-top object-cover rounded-2xl w-full"
        sizes="100vw md:25vw"
        format="webp"
        loading="lazy"
        :copyright="image_copyright"
      />
    </div>
    <div class="flex flex-col flex-grow pl-2">
      <div class="flex flex-row gap-5">
        <div>{{ date }}</div>
        <div>{{ place }}</div>
      </div>
      <h2 class="text-2xl md:text-4xl">{{ title }}</h2>
    </div>
    <div class="flex justify-end">
      <NuxtLink class="btn btn-primary w-auto self-end" :to="'/events/' + id">
        Learn more
      </NuxtLink>
    </div>
  </NuxtLink>
</template>
