<script setup>
const router = useRouter();
const routes = router.getRoutes();
</script>

<template>
  <footer class="bg-base-200 text-xl px-10">
    <div class="divider"></div>
    <div class="text-center font-semibold bg-error p-4">
      This website is fictional and was created as part of a third-year Media
      Engineering project at HEIG-VD.
    </div>
    <div class="flex flex-col gap-6 md:flex-row justify-around pt-8 pb-20">
      <div class="flex flex-col items-center gap-1">
        <NuxtLink to="/about" class="cursor-pointer">About us</NuxtLink>
        <NuxtLink to="/contact" class="cursor-pointer">Contact us</NuxtLink>
      </div>
      <div class="flex flex-col items-center gap-1">
        <p class="text-primary">Discover</p>
        <NuxtLink to="/serie" class="cursor-pointer">The web serie</NuxtLink>
        <NuxtLink to="/serie" class="cursor-pointer">Interview</NuxtLink>
        <NuxtLink to="/giveaway" class="cursor-pointer">Giveaway</NuxtLink>
        <NuxtLink to="/events" class="cursor-pointer">Event</NuxtLink>
      </div>
      <div class="flex flex-col items-center gap-1">
        <p class="text-primary">Become a coach</p>
        <NuxtLink to="/become-a-coach" class="cursor-pointer"
          >Practical information</NuxtLink
        >
        <NuxtLink
          to="https://www.football.ch/fr/asf/trainer/news/suivez-un-cours-c-basic-et-devenez-entraîneure.aspx"
          rel="noopener noreferrer"
          target="_blank"
          class="cursor-pointer"
          >Sign up</NuxtLink
        >
      </div>
      <div class="flex flex-col items-center gap-1">
        <p class="text-primary">Our social media</p>
        <a href="https://instagram.com" target="_blank" class="cursor-pointer"
          >Instagram</a
        >
        <a href="https://tiktok.com" target="_blank" class="cursor-pointer"
          >TikTok</a
        >
        <a href="https://youtube.com" target="_blank" class="cursor-pointer"
          >YouTube</a
        >
      </div>
    </div>
  </footer>
</template>
