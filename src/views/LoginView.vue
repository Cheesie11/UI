<template>
  <section class="login-wrapper">
    <v-card class="login-card" elevation="0">
      <header class="login-card__header">
        <h1>Welcome back</h1>
        <p>Sign in to continue.</p>
      </header>

      <v-form ref="formRef" fast-fail @submit.prevent="handleSubmit">
        <v-text-field
          v-model="credentials.email"
          label="Email"
          type="email"
          variant="outlined"
          density="comfortable"
          :rules="[rules.required, rules.email]"
        />

        <v-text-field
          v-model="credentials.password"
          label="Password"
          type="password"
          variant="outlined"
          density="comfortable"
          :rules="[rules.required, rules.min]"
        />

        <div class="register-hint">
          <span>No account?</span>
          <RouterLink to="/register">Create one</RouterLink>
        </div>

        <v-btn
          color="primary"
          size="large"
          type="submit"
          block
          :loading="loading"
        >
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
import { RouterLink } from "vue-router";

const formRef = ref(null);
const loading = ref(false);
const banner = ref("");
const credentials = reactive({
  email: "",
  password: "",
});

const rules = {
  required: (value) => !!value || "Required",
  email: (value) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
    "Enter a valid email",
  min: (value) => (value?.length ?? 0) >= 8 || "Use at least 8 characters",
};

const handleSubmit = async () => {
  if (!formRef.value) return;
  const { valid } = await formRef.value.validate();
  if (!valid) return;

  loading.value = true;
  banner.value = "";
  setTimeout(() => {
    loading.value = false;
    banner.value = "Demo login complete. Wire this up to your API next.";
  }, 900);
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
