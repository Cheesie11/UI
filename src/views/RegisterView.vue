<template>
  <section class="auth-wrapper">
    <v-card class="auth-card" elevation="0">
      <header class="auth-header">
        <h1>Create account</h1>
        <p>Sign up to continue.</p>
      </header>

      <v-form ref="formRef" fast-fail @submit.prevent="handleSubmit">
        <v-text-field v-model="firstname" label="First Name" variant="outlined" density="comfortable"
          :rules="[rules.required]" />

        <v-text-field v-model="lastname" label="Last Name" variant="outlined" density="comfortable"
          :rules="[rules.required]" />

        <v-btn color="primary" size="large" type="submit" block :loading="loading">
          Create account
        </v-btn>

        <div class="auth-footer">
          <span>Already have an account?</span>
          <RouterLink to="/login">Log in</RouterLink>
        </div>
      </v-form>

      <v-alert v-if="banner" type="success" variant="tonal" class="mt-4">
        {{ banner }}
      </v-alert>
    </v-card>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { register } from "../api/auth";

const router = useRouter();
const formRef = ref(null);
const loading = ref(false);
const banner = ref("");

const firstname = ref("");
const lastname = ref("");

const rules = {
  required: (v) => !!v || "Required",
};

const handleSubmit = async () => {
  if (!formRef.value) return;

  const { valid } = await formRef.value.validate();
  if (!valid) return;

  loading.value = true;
  banner.value = "";
  
  try {
    await register(firstname.value, lastname.value);
    banner.value = "Account created successfully! Redirecting to login...";
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  } catch (error) {
    banner.value = error.response?.data?.message || "Registration failed. Please try again.";
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-wrapper {
  width: 100%;
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  padding: 2.25rem 2rem;
  background-color: rgba(var(--v-theme-surface), 0.9);
  border-radius: 18px;
  border: 1px solid rgba(var(--v-theme-primary), 0.25);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0 25px 60px rgba(6, 10, 19, 0.45);
  backdrop-filter: blur(16px);
}

.auth-header h1 {
  margin: 0;
  font-size: 1.55rem;
  font-weight: 650;
  letter-spacing: -0.02em;
}

.auth-header p {
  margin-top: 0.4rem;
  font-size: 0.95rem;
  color: rgba(var(--v-theme-on-surface), 0.7);
}

.auth-footer {
  display: flex;
  justify-content: center;
  gap: 0.35rem;
  font-size: 0.9rem;
  margin-top: 1rem;
}

.auth-footer a {
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
  font-weight: 600;
}
</style>
