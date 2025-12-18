<script setup>
import { RouterLink, RouterView } from "vue-router";
import ThemeSwitcher from "./components/ThemeSwitcher.vue";
</script>

<template>
  <v-app>
    <v-app-bar elevation="0" color="background" flat>
      <v-app-bar-title>
        <RouterLink class="brand" to="/">CodeCriteria</RouterLink>
      </v-app-bar-title>

      <v-spacer />

      <div class="app-bar__actions">
        <v-btn
          class="nav-link"
          variant="text"
          :to="{ name: 'home' }"
        >
          Forms
        </v-btn>

        <v-btn
          class="nav-link"
          color="primary"
          variant="flat"
          :to="{ name: 'login' }"
        >
          Login
        </v-btn>

        <ThemeSwitcher />
      </div>
    </v-app-bar>

    <v-main class="app-main">
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>
.brand {
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  color: inherit;
}

.app-bar__actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.nav-link {
  text-transform: none;
  letter-spacing: normal;
  font-weight: 600;
}

.app-main {
  background: rgb(var(--v-theme-background));
  min-height: calc(100vh - 64px);
}
</style>
