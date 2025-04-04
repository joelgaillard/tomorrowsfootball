<script setup>
	import { ref } from "vue";

	const navItems = ref([
		{ to: "/serie", label: "Serie" },
		{ to: "/become-a-coach", label: "Become a coach" },
		{ to: "/quests", label: "Quests" },
		{ to: "/events", label: "Events" },
	]);
</script>

<template>
	<div class="navbar flex-row items-center justify-between bg-base-200 shadow-sm sticky top-0 z-50">
		<div>
			<nuxt-link to="/"><img src="/assets/img/logo/LogoHorizon-Dark-Transparent.svg" alt="Logo" class="w-64 h-auto"></nuxt-link>
		</div>
		<div class="flex items-center">
			<div class="dropdown dropdown-end">
				<label tabindex="0" class="btn btn-ghost lg:hidden">
					<p class="material-symbols-rounded">menu</p>
				</label>
				<ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
					<template v-for="(item, index) in navItems" :key="index">
						<li>
							<nuxt-link :to="item.to" active-class="font-black">{{ item.label }}</nuxt-link>
						</li>
					</template>
				</ul>
			</div>
			<ul class="menu menu-horizontal items-center hidden h-full lg:flex px-1">
				<template v-for="(item, index) in navItems" :key="index">
					<li>
						<nuxt-link :to="item.to" class="btn btn-ghost" active-class="font-black">{{ item.label }}</nuxt-link>
					</li>
				</template>
			</ul>
		</div>
	</div>
</template>

<style></style>
