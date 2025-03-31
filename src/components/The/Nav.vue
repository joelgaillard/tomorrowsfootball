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
	<div class="navbar bg-base-100 shadow-sm">
		<div class="flex-1">
			<nuxt-link to="/" class="btn btn-ghost text-xl">daisyUI</nuxt-link>
		</div>
		<div class="flex-none">
			<div class="dropdown dropdown-end">
				<label tabindex="0" class="btn btn-ghost lg:hidden">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
					</svg>
				</label>
				<ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
					<template v-for="(item, index) in navItems" :key="index">
						<li>
							<nuxt-link :to="item.to" active-class="font-black">{{ item.label }}</nuxt-link>
						</li>
					</template>
				</ul>
			</div>
			<ul class="menu menu-horizontal hidden lg:flex px-1">
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
