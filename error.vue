<template>
  <div data-theme="TWF" class="bg-base-200">
    <TheNav />

    <div class="px-6 py-12 md:px-24 md:py-20">
      <div class="flex flex-col gap-36 py-32 px-8">
        <div class="flex flex-col gap-12">
          <div class="flex flex-col gap-20 md:flex-row">
            <NuxtImg
              class="rounded-2xl object-cover object-center md:w-1/2"
              src="/img/404.gif"
              alt="Become a coach"
              sizes="100vw md:50vw"
              loading="lazy"
            />
            <div class="flex flex-col gap-8 justify-center md:w-1/2"> 
              <h1 class="text-5xl md:text-7xl font-bold"> <span class="text-secondary">Oops</span>, that wasn't planned!</h1>
              <p class="font-bold text-primary text-3xl md:text-5xl">
                Error {{ error.statusCode }}
              </p>
              <p class="text-lg md:text-2xl">{{ error.message }}</p>
              <NuxtLink 
                class="btn btn-primary md:self-start"
                to="/"
                >Back to home</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script setup>
const error = useError();

</script>

<style scoped></style>
