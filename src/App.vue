<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import ThemeSwitcher from "./components/ThemeSwitcher.vue";

const router = useRouter();
const currentUser = ref(null);

onMounted(() => {
  checkAuth();
});

const checkAuth = () => {
  const userData = localStorage.getItem('currentUser');
  currentUser.value = userData ? JSON.parse(userData) : null;
};

const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUser');
  currentUser.value = null;
  router.push('/login');
};

// Watch for route changes to update auth status
router.afterEach(() => {
  checkAuth();
});
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
          v-if="currentUser"
          class="nav-link"
          variant="text"
          :to="{ name: 'home' }"
        >
          Sessions
        </v-btn>

        <template v-if="!currentUser">
          <v-btn
            class="nav-link"
            color="primary"
            variant="flat"
            :to="{ name: 'login' }"
          >
            Login
          </v-btn>
        </template>

        <template v-else>
          <span class="user-greeting">{{ currentUser.firstname }} {{ currentUser.lastname }}</span>
          <v-btn
            class="nav-link"
            color="error"
            variant="flat"
            @click="logout"
          >
            Logout
          </v-btn>
        </template>

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

.user-greeting {
  font-size: 0.9rem;
  color: rgba(var(--v-theme-on-background), 0.7);
  margin-right: 0.5rem;
}

.app-main {
  background: rgb(var(--v-theme-background));
  min-height: calc(100vh - 64px);
}
</style>
