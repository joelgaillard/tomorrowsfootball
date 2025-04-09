<template>
    <div ref="dropdownRef" class="w-full relative flex flex-col gap-1">
        <!-- Label -->
        <label v-if="label"
            class="label text text-2xl font-semibold text-secondary-content break-words whitespace-normal leading-tight">
            {{ label }}
        </label>

        <!-- Trigger Button -->
        <button type="button" @click="toggleDropdown" :class="[
            'btn btn-outline text-2xl py-7 px-6 w-full flex justify-between items-center font-normal hover:border-secondary',
            error ? 'border-error' : ''
        ]">
            <span class="truncate overflow-hidden whitespace-nowrap">{{ selectedLabel || placeholder }}</span>
            <span class="material-symbols-rounded">arrow_drop_down</span>
        </button>

        <!-- Options list -->
        <ul v-if="isOpen"
            class="absolute top-full left-0 mt-2 bg-base-200 rounded-box z-50 w-full p-2 shadow-sm border-2">
            <li v-for="(option, index) in options" :key="index" class="hover:bg-secondary rounded-lg">
                <div @click="selectOption(option)"
                    class="flex flex-row items-center gap-4 text-2xl py-2 px-4 cursor-pointer">
                    <span class="material-symbols-rounded" :class="{ 'text-primary': modelValue === option.value }">
                        check_circle
                    </span>
                    <span>{{ option.label }}</span>
                </div>
            </li>
        </ul>

        <!-- Error -->
        <p v-if="error" class="text-error text-xl ml-2">{{ error }}</p>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
    modelValue: [String, Number],
    label: { type: String, default: '' },
    options: { type: Array, required: true },
    placeholder: { type: String, default: 'Select an option' },
    error: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const dropdownRef = ref(null)

function toggleDropdown() {
    isOpen.value = !isOpen.value
}

function selectOption(option) {
    emit('update:modelValue', option.value)
    isOpen.value = false
}

const selectedLabel = computed(() => {
    const selected = props.options.find(opt => opt.value === props.modelValue)
    return selected ? selected.label : ''
})

// Close dropdown if click outside
function handleClickOutside(event) {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        isOpen.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>