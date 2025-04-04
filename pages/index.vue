<script setup lang="ts">
const { data: events } = await useFetch('/api/events');

const nextEvents = computed(() => events.value?.slice(0, 3) || []);
</script>

<template>
	<div class="flex flex-col gap-36 py-32 px-8">
		<div class="flex flex-col gap-6 md:flex-row ">
			<div class="flex flex-col gap-12  justify-center md:w-1/2">
				<h1 class="text-7xl font-bold">The future of women’s football coaching starts here!</h1>
				<p class="text-3xl">Tomorrow’s Football is a hub designed to empower female football coaches. Join our
					growing community, get inspired by our exclusive web series, and take the next step in your coaching
					journey!</p>
				<button class="btn btn-primary md:self-start" @click="joinUs">Join us</button>
			</div>
			<div class="md:w-1/2">
				<img class="rounded-2xl w-full h-full object-cover object-center" src="/img/home/join-us.webp"
					alt="Tomorrow’s Football - Join us">
			</div>
		</div>

		<div class="flex flex-col gap-12">
			<h1 class="text-7xl font-bold">What is Tomorrow’s Football?</h1>
			<p class="text-3xl">Tomorrow’s Football is a collaborative space dedicated to female football coaches.
				Whether you're just starting out or looking to enhance your skills, our platform offers resources,
				networking opportunities, and a supportive community. Through exclusive content, interactive challenges,
				and real-world events, we’re shaping the future of women’s coaching together.</p>
			<div class="flex flex-col gap-4 justify-around md:flex-row md:gap-16">
				<div id="card"
					class="flex flex-col justify-around items-center text-center w-full px-6 py-20 gap-8 rounded-3xl border-base-300  border-3">
					<div class="text-3xl font-semibold">Web series & interviews</div>
					<p class="text-2xl">Get inspired by real stories and expert advice.</p>
					<button class="btn btn-primary btn-outline">Watch now</button>
				</div>
				<div id="card"
					class="flex flex-col justify-around items-center text-center w-full px-6 py-20 gap-8 rounded-3xl border-base-300  border-3">
					<div class="text-3xl font-semibold">Community & support</div>
					<p class="text-2xl">Connect with fellow coaches and mentors.</p>
					<button class="btn btn-primary btn-outline">Become a coach</button>
				</div>
				<div id="card"
					class="flex flex-col justify-around items-center text-center w-full px-6 py-20 gap-8 rounded-3xl border-base-300  border-3">
					<div class="text-3xl font-semibold">Training & events</div>
					<p class="text-2xl">Participate in coaching workshops and discussions.</p>
					<button class="btn btn-primary btn-outline">View all events</button>
				</div>
			</div>
		</div>

		<div class="flex flex-col-reverse gap-12 md:flex-row">
			<img class="md:w-1/2 rounded-2xl  object-cover object-center"
				src="https://s3-alpha-sig.figma.com/img/ae48/c126/d1f12df3b854e0ce51f7349efe379aff?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=b616UvVL0Pg~Q4SUzoPakPRdKWpT57d-Td4l2dW4qe7n9p5j5FujIIn0UxMYnnrITa~Mh4ruUOVvXo6OkDRLMglg045ZB8kmMONQ0WZVeOv-Yu1T~gfZ69y8B9JyxhVB0bgL1DCqXIsUucwSmv9q98ZZsan2UXY-bXBdn2r-LMkfpcfSBuWxhim7s~vUp16PcmNWEbVAaGeUcT1sUR-nYexDREXXa~HqSFSzuBc3v6hcTg6GIrRrZzZAkj04cSzBTMH1vgJUcKOIkDD7EUY5GMxWSdZO1rFcSSa4IG7mnAY9sqt8KVEPkggUaf3roqV9idmtLoZcyI5x2wTrvUBeMg__"
				alt="">
			<div class="md:w-1/2 flex flex-col gap-12">
				<h1 class="text-7xl font-bold">Discover our exclusive web series</h1>
				<p class="text-3xl">“Coach Like a Woman” is a one-of-a-kind web series that brings you closer to the
					realities of women’s
					football coaching. Each episode features interviews with experienced coaches and players, tackling
					real
					challenges and sharing valuable insights. Through engaging storytelling and immersive experiences,
					we
					aim to inspire and equip the next generation of female coaches.</p>
			</div>
		</div>

		<div class="flex flex-col gap-12">
			<h1 class="text-7xl font-bold">Join the quest and unlock exclusive content!</h1>
			<p class="text-3xl">Hidden clues are embedded in each episode of “<a class="text-primary underline"
					href="">Coach Like a Woman</a>”. Uncover secrets, and gain access to exclusive behind-the-scenes
				content and special rewards!</p>
			<button class="btn btn-primary md:self-start">Uncover secrets now!</button>
		</div>

		<div class="flex flex-col gap-12">
			<h1 class="text-7xl font-bold">Stay updated on coaching events</h1>
			<p class="text-3xl">At Tomorrow’s Football, we believe in continuous learning and networking. Explore our
				calendar of upcoming workshops, live Q&As, and exclusive coaching events designed to help you grow in
				your career.</p>
			<button class="btn btn-primary md:self-start">Uncover secrets now!</button>
			<div class="flex items-center gap-4">
				<h2 class="text-4xl font-semibold">Our next events -</h2>
				<p class="link link-primary">View full event calendar</p>
			</div>
			<div class="grid grid-cols-1 gap-x-20 gap-y-16 md:grid-cols-2 md:px-24 lg:grid-cols-3  ">
				<BaseEventCard v-for="event in nextEvents" :key="event.id" :id="event.id" :title="event.title"
					:date="event.date" :place="event.place" :image_url="event.image_url" />
			</div>
		</div>
	</div>
</template>
