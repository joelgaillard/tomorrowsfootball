<template>
  <div class="relative" :class="wrapperClass">
    <NuxtImg v-bind="$attrs" :class="imgClass" />
    <div
      v-if="copyright"
      :class="[
        'absolute text-base-content text-[10px] md:text-xs px-2 py-1 rounded bg-base-100/50',
        positionClass,
      ]"
    >
      {{ copyright }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  copyright: String,
  position: {
    type: String,
    default: "bottom-left",
  },
  wrapperClass: {
    type: String,
    default: "",
  },
  imgClass: {
    type: String,
    default: "",
  },
});

const positionClass = computed(() => {
  switch (props.position) {
    case "bottom-left":
      return "bottom-2 left-2";
    case "top-right":
      return "top-2 right-2";
    case "top-left":
      return "top-2 left-2";
    case "bottom-center":
      return "bottom-2 left-1/2 -translate-x-1/2";
    default:
      return "bottom-2 right-2";
  }
});
</script>
