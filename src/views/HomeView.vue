<template>
  <div class="content">
    <div class="home-header">
      <h1>Welcome to IPA Criteria</h1>
      <p>Manage your project criteria and evaluate your work quality.</p>
    </div>

    <div class="home-actions">
      <v-btn 
        color="primary" 
        size="large"
        to="/sessions"
      >
        View My Sessions
      </v-btn>
      <v-btn 
        color="secondary" 
        variant="outlined"
        size="large"
        to="/sessions"
      >
        + New Session
      </v-btn>
    </div>

    <div v-if="currentUser" class="user-info">
      <v-card>
        <v-card-title>Your Profile</v-card-title>
        <v-card-text>
          <p><strong>Name:</strong> {{ currentUser.firstname }} {{ currentUser.lastname }}</p>
          <v-btn color="error" @click="logout" class="mt-4">Logout</v-btn>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const currentUser = ref(null);

onMounted(() => {
  const userData = localStorage.getItem('currentUser');
  if (userData) {
    currentUser.value = JSON.parse(userData);
  } else {
    router.push('/login');
  }
});

const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUser');
  router.push('/login');
};
</script>

<style scoped>
.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.home-header {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(var(--v-theme-primary), 0.1), rgba(var(--v-theme-secondary), 0.1));
  border-radius: 12px;
}

.home-header h1 {
  margin: 0 0 1rem 0;
  font-size: 2.5rem;
  font-weight: 700;
}

.home-header p {
  margin: 0;
  font-size: 1.1rem;
  color: rgba(var(--v-theme-on-surface), 0.7);
}

.home-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.user-info {
  margin-top: 2rem;
}
</style>
