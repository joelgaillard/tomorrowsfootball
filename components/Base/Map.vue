<template>
  <iframe
    v-if="finalEmbedUrl"
    class="rounded-2xl"
    :src="finalEmbedUrl"
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
    width="100%"
    height="100%"
    style="border: 0; min-height: 400px"
  ></iframe>
  <p v-else class="text-error">L'URL ou l'adresse fournie n'est pas valide.</p>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  addressOrUrl: {
    type: String,
    required: true,
  },
});

const finalEmbedUrl = computed(() => {
  const val = props.addressOrUrl.trim();

  if (!val.startsWith("http")) {
    const q = encodeURIComponent(val);
    return `https://www.google.com/maps?q=${q}&output=embed`;
  }

  if (val.includes("google.com/maps/place")) {
    return val.replace("/maps/place", "/maps/embed?pb=");
  }

  if (val.includes("maps.app.goo.gl")) {
    return null;
  }

  return null;
});
</script>
