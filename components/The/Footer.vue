<script setup>
    const router = useRouter()
    const routes = router.getRoutes()

    console.log(routes)
</script>

<template>
	<div class="bg-base-200 text-xl px-10">
		<div class="divider"></div>
		<div class="flex justify-around pt-8 pb-10">
			<div class="flex flex-col items-center gap-1">
				<a class="cursor-pointer">About us</a>
				<a class="cursor-pointer">Contact us</a>
			</div>
			<div class="flex flex-col items-center gap-1">
				<p class="text-primary">Discover</p>
				<a class="cursor-pointer">The web serie</a>
				<a class="cursor-pointer">Interview</a>
				<a class="cursor-pointer">Giveaway</a>
				<a class="cursor-pointer">Event</a>
			</div>
			<div class="flex flex-col items-center gap-1">
				<p class="text-primary">Become a coach</p>
				<a class="cursor-pointer">Partical information</a>
				<a class="cursor-pointer">Sign up</a>
			</div>
			<div class="flex flex-col items-center gap-1">
				<p class="text-primary">Our social media</p>
				<a class="cursor-pointer">Instagram</a>
				<a class="cursor-pointer">TitTok</a>
				<a class="cursor-pointer">Youtube</a>
			</div>
		</div>
	</div>
</template>
