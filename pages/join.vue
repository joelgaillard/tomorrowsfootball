<script setup>
const { $csrfFetch } = useNuxtApp();

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  phone: "",
});

const errors = reactive({
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  phone: "",
});

const submitting = ref(false);
const formSubmitted = ref(false);

function validateForm() {
  let isValid = true;

  errors.firstName = form.firstName.trim() ? "" : "First name is required.";
  if (errors.firstName) isValid = false;

  errors.lastName = form.lastName.trim() ? "" : "Last name is required.";
  if (errors.lastName) isValid = false;

  errors.email = /\S+@\S+\.\S+/.test(form.email)
    ? ""
    : "A valid email address is required.";
  if (errors.email) isValid = false;

  errors.gender = form.gender ? "" : "Please select your gender.";
  if (errors.gender) isValid = false;

  if (form.phone) {
    const phoneRegex = /^\+41\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
    if (!phoneRegex.test(form.phone)) {
      errors.phone = "Please enter a valid phone number (+41 XX XXX XX XX).";
      isValid = false;
    }
  }
  return isValid;
}

async function submitForm() {
  formSubmitted.value = true;

  if (!validateForm()) return;

  submitting.value = true;
  try {
    await $csrfFetch("/api/subscribe", {
      method: "PUT",
      body: form,
    });
    alert("Form submitted successfully!");
  } catch (err) {
    alert(
      "An error occurred while submitting the form. Please try again later."
    );
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="flex flex-col gap-16">
      <!-- Titre -->
      <h1 class="text-5xl md:text-7xl font-bold">Stay connected to Tomorrow’s Football</h1>
      <p class="text-xl md:text-3xl text-secondary">
        Sign up to get the latest updates from the association, news about
        upcoming events, and access to our private channels to connect with the
        community.
      </p>
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-6 md:flex-row md:gap-4">
          <BaseInput
            v-model="form.firstName"
            label="First name"
            placeholder="Joan"
            :error="formSubmitted ? errors.firstName : ''"
          />
          <BaseInput
            v-model="form.lastName"
            label="Last name"
            placeholder="Doe"
            :error="formSubmitted ? errors.lastName : ''"
          />
        </div>

        <BaseDropdown
          v-model="form.gender"
          label="Gender"
          :options="[
            { label: 'Female', value: 'Female' },
            { label: 'Male', value: 'Male' },
            { label: 'Other', value: 'Other' },
          ]"
          placeholder="Select your gender"
          :error="formSubmitted ? errors.gender : ''"
        />

        <BaseInput
          v-model="form.email"
          label="Email address"
          placeholder="joan.doe@example.com"
          :error="formSubmitted ? errors.email : ''"
        />

        <BaseInput
          v-model="form.phone"
          label="Phone number"
          placeholder="+41 79 123 45 67"
          :required="false"
          :error="formSubmitted ? errors.phone : ''"
        />
      </div>
      <button
        type="submit"
        class="btn btn-primary md:self-end"
        :disabled="submitting"
      >
        {{ submitting ? "Sending..." : "Submit" }}
      </button>
    </div>
  </form>
</template>
