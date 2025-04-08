<script setup>
	import { ref } from "vue";

	const navItems = ref([
		{ to: "/serie", label: "Serie" },
		{ to: "/become-a-coach", label: "Become a coach" },
		{ to: "/giveaway", label: "Giveaway" },
		{ to: "/events", label: "Events" },
	]);
</script>

<template>
	<div class="navbar flex-row items-center justify-between bg-base-200 shadow-sm sticky top-0 z-50">
		<div>
			<nuxt-link to="/"
				><img src="/assets/img/logo/LogoHorizon-Dark-Transparent.svg" alt="Logo" class="w-72 md:w-80 h-auto"
			/></nuxt-link>
		</div>
		<div class="flex items-center">
			<div class="dropdown dropdown-end">
				<label tabindex="0" class="btn btn-ghost lg:hidden">
					<p class="material-symbols-rounded">menu</p>
				</label>
				<ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
					<template v-for="(item, index) in navItems" :key="index">
						<li>
							<nuxt-link
								:to="item.to"
								class="btn btn-ghost relative text-lg"
								active-class="font-extrabold after:content-[] after:absolute after:-bottom-3 after:left-1/2 after:-translate-1/2 after:w-10 after:h-5 after:bg-[url(/assets/img/underlines/UnderLine-Orange.svg)] after:bg-contain after:bg-no-repeat">
								{{ item.label }}
							</nuxt-link>
						</li>
					</template>
				</ul>
			</div>
			<ul class="menu menu-horizontal items-center hidden h-full lg:flex px-1">
				<template v-for="(item, index) in navItems" :key="index">
					<li>
						<nuxt-link
							:to="item.to"
							class="btn btn-ghost relative text-lg"
							active-class="font-extrabold after:content-[] after:absolute after:-bottom-3 after:left-1/2 after:-translate-1/2 after:w-10 after:h-5 after:bg-[url(/assets/img/underlines/UnderLine-Orange.svg)] after:bg-contain after:bg-no-repeat">
							{{ item.label }}
						</nuxt-link>
					</li>
				</template>
			</ul>
		</div>
	</div>
</template>
