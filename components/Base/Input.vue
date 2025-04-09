<template>
    <fieldset class="form-control flex flex-col gap-1 w-full">
        <label v-if="label" class="label text text-2xl font-semibold text-secondary-content">
            {{ label }}
        </label>
        <input class=" border-primary-content bg-base-200 focus:outline-none focus:border-secondary "
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :type="type"
            :placeholder="placeholder"
            :class="['input input-bordered text-2xl py-7 px-6 w-full ', error ? 'input-error' : '']"
            :required="required"
        />
        <p v-if="error" class="text-error text-xl ml-2">{{ error }}</p>
    </fieldset>
</template>

<script setup>
defineProps({
    modelValue: String,
    label: String,
    type: { type: String, default: 'text' },
    placeholder: String,
    error: String,
    required: { type: Boolean, default: false }
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.input-error {
    border-color: var(--color-error);
}
</style>