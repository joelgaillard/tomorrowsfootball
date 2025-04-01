<script setup></script>

<template>
	<div class="flex flex-col items-start gap-24 p-4 mt-16">
		<div class="flex flex-col items-start gap-16">
			<h1 class="text-7xl font-bold">Coach like a woman</h1>
			<div class="flex flex-col items-center md:flex-row gap-4">
				<figure class="rounded-box relative">
					<img
						src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
						alt="Shoes"
						class="rounded-box opacity-70" />
					<p class="material-symbols-rounded">
						<span class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl"
							>play_circle</span
						>
					</p>
				</figure>
				<div class="flex flex-col items-start gap-2">
					<h2 class="text-4xl font-bold">S01 E01 - New start</h2>
					<p>
						As the club will close because of lacking of a coach we follow Emily the big sister of a player who
						the life will be change for the better.
					</p>
					<p class="link link-primary">View full interview</p>
					<div class="flex flex-row gap-4 my-4">
						<p class="btn btn-primary btn-outline">Previous</p>
						<p class="btn btn-primary">Next</p>
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-col items-start gap-16">
			<div class="flex flex-row items-start gap-12">
				<h3 class="text-6xl font-bold">Episodes</h3>
				<h3 class="text-6xl">Interviews</h3>
			</div>
			<div class="flex flex-row items-start gap-12">
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					<BaseCard title="test" />
					<BaseCard title="test" />
					<BaseCard title="test" />
					<BaseCard title="test" />
					<BaseCard title="test" />
					<BaseCard title="test" />
					<BaseCard title="test" />
				</div>
			</div>
		</div>
	</div>
</template>
