<script setup>

const { $csrfFetch } = useNuxtApp()

const form = reactive({
  answer: '',
  firstName: '',
  lastName: '',
  email: '',
  gender: '',
  relation: '',
  coach: '',
  contact: ''
})

const errors = reactive({
  answer: '',
  firstName: '',
  lastName: '',
  email: '',
  gender: '',
  relation: '',
  coach: '',
  contact: '',
})

const submitting = ref(false)
const formSubmitted = ref(false)

function validateForm() {
  let isValid = true;

  errors.firstName = form.firstName.trim() ? '' : 'First name is required.';
  if (errors.firstName) isValid = false;

  errors.lastName = form.lastName.trim() ? '' : 'Last name is required.';
  if (errors.lastName) isValid = false;

  errors.email = /\S+@\S+\.\S+/.test(form.email) ? '' : 'A valid email address is required.';
  if (errors.email) isValid = false;

  errors.gender = form.gender ? '' : 'Please select your gender.';
  if (errors.gender) isValid = false;

  errors.answer = form.answer ? '' : 'Please select an answer.';
  if (errors.answer) isValid = false;

  errors.relation = form.relation ? '' : 'Please select your relationship with football.';
  if (errors.relation) isValid = false;

  errors.coach = form.coach ? '' : 'Please select your coaching experience.';
  if (errors.coach) isValid = false;

  errors.contact = form.contact ? '' : 'Please select your contact preference.';
  if (errors.contact) isValid = false;

  return isValid;
}

async function submitForm() {
  formSubmitted.value = true;

  if (!validateForm()) return;

  submitting.value = true;
  try {
    await $csrfFetch('/api/subscribe', {
      method: 'PUT',
      body: form
    });
    alert('Thank you for your participation! 🎉');
  } catch (err) {
    alert('An error occurred while submitting the form. Please try again later.');
  } finally {
    submitting.value = false;
  }
}
</script>


<template>
  <form @submit.prevent="submitForm">
    <div class="flex flex-col gap-16">
      <!-- Titre -->
      <h1 class="text-7xl font-bold">Giveaway</h1>

      <!-- Question -->
      <div class="flex flex-col gap-4">
        <div class="text-3xl text-secondary">Answer the question to enter the prize draw.</div>
        <div class="text-3xl">Good luck!</div>
        <div class="text-3xl font-bold">What is Sarah's best friend's name? <span class="text-primary">*</span></div>

        <fieldset class="form-control flex flex-col gap-4">
          <label class="label cursor-pointer gap-3 text-secondary-content">
            <input type="radio" name="answer" value="Nicky" v-model="form.answer" class="radio radio-l" />
            <span class="label-text text-2xl text-secondary-content">Nicky</span>
          </label>
          <label class="label cursor-pointer gap-3 text-secondary-content">
            <input type="radio" name="answer" value="Lea" v-model="form.answer" class="radio radio-l" />
            <span class="label-text text-2xl text-secondary-content">Lea</span>
          </label>
          <label class="label cursor-pointer gap-3 text-secondary-content">
            <input type="radio" name="answer" value="Robin" v-model="form.answer" class="radio radio-l" />
            <span class="label-text text-2xl text-secondary-content">Robin</span>
          </label>
        </fieldset>

        <p v-if="formSubmitted && errors.answer" class="text-error text-xl ml-2">
          {{ errors.answer }}
        </p>
      </div>

      <!-- Infos personnelles -->
      <div class="flex flex-col gap-6">
        <h2 class="text-6xl font-bold">Personal information</h2>

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
            { label: 'Other', value: 'Other' }
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
      </div>

      <!-- Questions sur le football -->
      <div class="flex flex-col gap-6">
        <h2 class="text-6xl font-bold">Some questions about football</h2>

        <div class="flex flex-col gap-6 md:flex-row md:gap-4">
          <BaseDropdown
            v-model="form.relation"
            label="Your relationship with football"
            :options="[
              { label: 'I play', value: 'I play' },
              { label: 'I think tactically', value: 'I think tactically' },
              { label: 'I already coach a little', value: 'I already coach a little' },
              { label: 'I just enjoy observing', value: 'I just enjoy observing' }
            ]"
            placeholder="Select an option"
            :error="formSubmitted ? errors.relation : ''"
          />

          <BaseDropdown
            v-model="form.coach"
            label="Have you ever coached?"
            :options="[
              { label: 'Yes', value: 'Yes' },
              { label: 'No', value: 'No' },
              { label: 'In progress', value: 'In progress' },
              { label: 'I want to try', value: 'I want to try' }
            ]"
            placeholder="Select an option"
            :error="formSubmitted ? errors.coach : ''"
          />
        </div>

        <BaseDropdown
          v-model="form.contact"
          label="Would you like to be contacted to discuss about it?"
          :options="[
            { label: 'Yes, definitely', value: 'Yes, definitely' },
            { label: 'Maybe later', value: 'Maybe later' },
            { label: 'No thanks', value: 'No thanks' },
            { label: 'I\'m just playing along', value: 'Just play' }
          ]"
          placeholder="Select an option"
          :error="formSubmitted ? errors.contact : ''"
        />
      </div>

      <button type="submit" class="btn btn-primary md:self-end" :disabled="submitting">
        {{ submitting ? 'Sending...' : 'Submit' }}
      </button>
    </div>
  </form>
</template>
