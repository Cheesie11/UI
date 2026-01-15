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
        to="/sessions?new=true"
      >
        + New Session
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  const userData = localStorage.getItem('currentUser');
  if (!userData) {
    router.push('/login');
  }
});
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
  border-radius: 12px;
}

.home-header h1 {
  margin: 0 0 1rem 0;
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-secondary)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.home-header p {
  margin: 0;
  font-size: 1.1rem;
  background: linear-gradient(135deg, rgba(var(--v-theme-primary), 0.8), rgba(var(--v-theme-secondary), 0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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
