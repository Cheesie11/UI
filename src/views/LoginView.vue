<template>
  <section class="login-wrapper">
    <v-card class="login-card" elevation="0">
      <header class="login-card__header">
        <h1>Welcome back</h1>
        <p>Sign in to continue.</p>
      </header>

      <v-form ref="formRef" fast-fail @submit.prevent="handleSubmit">
        <v-text-field v-model="credentials.firstname" label="First Name" variant="outlined" density="comfortable"
          :rules="[rules.required]" />

        <v-text-field v-model="credentials.lastname" label="Last Name" variant="outlined"
          density="comfortable" :rules="[rules.required]" />

        <div class="register-hint">
          <span>No account?</span>
          <RouterLink to="/register">Create one</RouterLink>
        </div>

        <v-btn color="primary" size="large" type="submit" block :loading="loading">
          Log in
        </v-btn>
      </v-form>

      <v-alert v-if="banner" type="success" variant="tonal" class="mt-4">
        {{ banner }}
      </v-alert>
    </v-card>
  </section>
</template>

<script setup>
import { reactive, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { login } from "../api/auth";

const router = useRouter();
const formRef = ref(null);
const loading = ref(false);
const banner = ref("");
const credentials = reactive({
  firstname: "",
  lastname: "",
});

const rules = {
  required: (value) => !!value || "Required",
};

const handleSubmit = async () => {
  if (!formRef.value) return;
  const { valid } = await formRef.value.validate();
  if (!valid) return;

  loading.value = true;
  banner.value = "";
  
  try {
    const response = await login(credentials.firstname, credentials.lastname);
    // Store user data from response
    if (response.data) {
      localStorage.setItem("currentUser", JSON.stringify(response.data));
    }
    banner.value = "Login successful! Redirecting...";
    // Redirect after brief delay to show success message
    setTimeout(() => {
      router.push("/");
    }, 500);
  } catch (error) {
    banner.value = error.response?.data || "Login failed. Please try again.";
    loading.value = false;
  }
};
</script>

<style scoped>
.login-wrapper {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.login-card {
  max-width: 420px;
  width: 100%;
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

.login-card__header h1 {
  font-size: 1.55rem;
  font-weight: 650;
}

.login-card__header p {
  margin-top: 0.4rem;
  font-size: 0.95rem;
  color: rgba(var(--v-theme-on-surface), 0.7);
}

.register-hint {
  display: flex;
  justify-content: center;
  gap: 0.35rem;
  font-size: 0.9rem;
  margin: 0.25rem 0 1.25rem;
}

.register-hint a {
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
  font-weight: 600;
}
</style>
