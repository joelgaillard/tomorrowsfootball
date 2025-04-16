<script setup lang="ts">
import "vidstack/bundle";

const { data: events } = await useFetch("/api/events");

const nextEvents = computed(() => events.value?.slice(0, 3) || []);

const { data: allData } = await useFetch("/api/serie");
const featuredEpisode = computed(() => {
  const firstSeason = allData.value?.serie?.find((s) => s.season === 1);
  return firstSeason?.episodes?.find((ep) => ep.episode === 1);
});
</script>

<template>
  <div class="flex flex-col gap-36 py-32 px-8">
    <div class="flex flex-col gap-6 md:flex-row">
      <div class="flex flex-col gap-12 justify-center md:w-1/2">
        <h1 class="text-7xl font-bold">
          The future of women’s football coaching starts here!
        </h1>
        <p class="text-3xl">
          Tomorrow’s Football is a hub designed to empower female football
          coaches. Join our growing community, get inspired by our exclusive web
          series, and take the next step in your coaching journey!
        </p>
        <NuxtLink class="btn btn-primary md:self-start" to="/join"
          >Join us</NuxtLink
        >
      </div>
      <div class="md:w-1/2">
        <BaseImg
          src="/img/home/join-us.webp"
          alt="Tomorrow’s Football - Join us"
          wrapper-class="w-full h-full"
          img-class="rounded-2xl w-full h-full object-cover object-center"
          sizes="100vw md:50vw"
          format="webp"
          loading="lazy"
          copyright="TOTO MARTI"
        />
      </div>
    </div>

    <div class="flex flex-col gap-12">
      <h1 class="text-7xl font-bold">What is Tomorrow’s Football?</h1>
      <p class="text-3xl">
        Tomorrow’s Football is a collaborative space dedicated to female
        football coaches. Whether you're just starting out or looking to enhance
        your skills, our platform offers resources, networking opportunities,
        and a supportive community. Through exclusive content, interactive
        challenges, and real-world events, we’re shaping the future of women’s
        coaching together.
      </p>
      <div class="flex flex-col gap-4 justify-around md:flex-row md:gap-16">
        <div
          id="card"
          class="flex flex-col justify-around items-center text-center w-full px-6 py-20 gap-8 rounded-3xl border-base-300 border-3"
        >
          <div class="text-3xl font-semibold">Web series & interviews</div>
          <p class="text-2xl">
            Dive into an animated series packed with real coaching advice from
            football professionals.
          </p>
          <NuxtLink class="btn btn-primary btn-outline" to="/series"
            >Watch now</NuxtLink
          >
        </div>
        <div
          id="card"
          class="flex flex-col justify-around items-center text-center w-full px-6 py-20 gap-8 rounded-3xl border-base-300 border-3"
        >
          <div class="text-3xl font-semibold">Community & support</div>
          <p class="text-2xl">
            Find out how to start your coaching journey and help shape the
            future of football.
          </p>
          <NuxtLink class="btn btn-primary btn-outline" to="/become-a-coach"
            >Become a coach</NuxtLink
          >
        </div>
        <div
          id="card"
          class="flex flex-col justify-around items-center text-center w-full px-6 py-20 gap-8 rounded-3xl border-base-300 border-3"
        >
          <div class="text-3xl font-semibold">Training & events</div>
          <p class="text-2xl">
            Participate in coaching workshops and discussions.
          </p>
          <NuxtLink class="btn btn-primary btn-outline" to="/events"
            >View all events</NuxtLink
          >
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-12 md:flex-row">
      <BasePlayer
        :title="featuredEpisode.value?.title"
        :videoSrc="featuredEpisode.value?.video_url"
        :posterSrc="featuredEpisode.value?.image_url"
      />
      <div class="md:w-1/2 flex flex-col gap-12">
        <h1 class="text-7xl font-bold">Discover our exclusive web series</h1>
        <p class="text-3xl">
          “Coach Like a Woman” is a one-of-a-kind web series that brings you
          closer to the realities of women’s football coaching. Each episode
          features interviews with experienced coaches and players, tackling
          real challenges and sharing valuable insights. Through engaging
          storytelling and immersive experiences, we aim to inspire and equip
          the next generation of female coaches.
        </p>
        <NuxtLink class="btn btn-primary md:self-start" to="/series"
          >Watch the series</NuxtLink
        >
      </div>
    </div>

    <div class="flex flex-col gap-12">
      <h1 class="text-7xl font-bold">Stay updated on coaching events</h1>
      <p class="text-3xl">
        At Tomorrow’s Football, we believe in continuous learning and
        networking. Explore our calendar of upcoming workshops, live Q&As, and
        exclusive coaching events designed to help you grow in your career.
      </p>
      <div class="flex items-center gap-4">
        <h2 class="text-4xl font-semibold">Our next events -</h2>
        <NuxtLink class="link link-primary" to="/events"
          >View full event calendar</NuxtLink
        >
      </div>
      <div
        class="grid grid-cols-1 gap-x-20 gap-y-16 md:grid-cols-2 md:px-24 lg:grid-cols-3"
      >
        <BaseEventCard
          v-for="event in nextEvents"
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
