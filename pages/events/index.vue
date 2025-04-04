<template>
    <div class="flex flex-col items-start gap-24 p-4 mt-16">
        <h1 class="text-7xl font-bold ">Events</h1>

        <!-- Section next event -->
        <div class="flex flex-col gap-8">
            <h2 class="text-6xl font-bold ">Next event</h2>
            <div class="flex flex-col lg:flex-row gap-5">
                <img :src="nextEvent.image_url" :alt="nextEvent.title"
                    class="rounded-2xl w-full md:h-96 w-1/2 object-top object-cover" />
                <div class="flex flex-col gap-12">
                    <div class="flex flex-col gap-4">
                        <div class="text-4xl font-bold">{{ nextEvent.title }}</div>
                        <div class="text-3xl font-bold">{{ formatDate(nextEvent.date) }} - {{ nextEvent.place }}</div>
                        <p class="text-2xl"> {{ nextEvent.desc }}</p>
                    </div>
                    <div class="flex gap-4">
                        <button class="btn btn-primary btn-outline " @click="goToNextEvent">More details</button>
                        <button class="btn btn-primary" @click="registerNextEvent">Register</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Section other events -->
        <div class="flex flex-col gap-8">
            <div class="flex flex-col flex-wrap justify-between md:items-center flex-row">
                <h2 class="text-6xl font-bold ">Other events</h2>
                <details class="dropdown w-full md:w-auto items-center">
                    <summary class="btn text-2xl border-neutral flex justify-between items-center px-4">
                        <span class="text-left">Filter by region</span>
                        <span class="material-symbols-rounded"
                            :class="{ 'text-primary font-bold': selectedRegions.length > 0 }">
                            filter_alt
                        </span>
                    </summary>
                    <ul class="menu dropdown-content bg-base-100 rounded-box z-10 w-full left-0 p-2 shadow-lg absolute">
                        <li v-for="region in availableRegions" :key="region" class="flex gap-2 px-2 py-1">
                            <label :for="region" class="cursor-pointer flex items-center gap-2 w-full">
                                <input type="checkbox" :id="region" :value="region" v-model="selectedRegions"
                                    class="w-4 h-4">
                                {{ region }}
                            </label>
                        </li>
                        <li class="mt-2">
                            <button class="btn btn-primary btn-outline w-full" @click="resetSelection">Reset</button>
                        </li>
                    </ul>
                </details>
            </div>
            <div class="grid grid-cols-1 gap-x-5 gap-y-16 md:grid-cols-2 lg:grid-cols-4 ">
                <BaseEventCard v-for="event in filteredEvents" :key="event.id" :id="event.id" :title="event.title"
                    :date="event.date" :place="event.place" :image_url="event.image_url" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { data: allEvents } = await useFetch('/api/events');

const nextEventId = allEvents.value?.[0]?.id; // Récupère l'ID du premier event

const { data: nextEventData } = await useFetch(`/api/events/${nextEventId}`);

const nextEvent = nextEventData.value || null; // Prendre tout l'objet de l'event

// Stocker les autres événements (sauf le premier)
const otherEvents = allEvents.value
    .slice(1) // Exclut le premier élément
    .map((event: any) => ({
        id: event.id,
        title: event.title,
        date: event.date,
        place: event.place,
        image_url: event.image_url,
    }));

const router = useRouter();

const goToNextEvent = () => {
    router.push('/events/' + nextEvent.id);
};

const registerNextEvent = () => {
    alert('You have registered for the event: ' + nextEvent.title);
};

const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    let month = dateObj.toLocaleString('default', { month: 'long' });
    month = month.charAt(0).toUpperCase() + month.slice(1);

    // Gérer le suffixe des jours (1st, 2nd, 3rd, 4th...)
    let suffix = 'th';
    if (day === 1 || day === 21 || day === 31) {
        suffix = 'st';
    } else if (day === 2 || day === 22) {
        suffix = 'nd';
    } else if (day === 3 || day === 23) {
        suffix = 'rd';
    }

    return `${day}${suffix} ${month}`;
};

// Stocke les régions sélectionnées
const selectedRegions = ref<string[]>([]);

const availableRegions = computed(() => {
    const regions = otherEvents.map(event => event.place);
    return [...new Set(regions)];
});

const filteredEvents = computed(() => {
    if (selectedRegions.value.length === 0) return otherEvents; // Afficher tout si aucune sélection
    return otherEvents.filter(event => selectedRegions.value.includes(event.place));
});

const resetSelection = () => {
    selectedRegions.value = [];
};

</script>