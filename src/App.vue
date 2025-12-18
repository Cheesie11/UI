<script setup>
import DummyBox from './components/DummyBox.vue'
</script>

<template>
  <div class="app-root">
    <nav class="top-nav">
      <span class="logo">My App</span>
      <ul class="nav-links">
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>

    <main class="content">
      <DummyBox />
    </main>
  </div>
</template>

<style scoped>
.app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.top-nav {
  height: 64px;
  background: #1976d2;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
}

.content {
  padding: 2rem;
  flex: 1;
}
</style>
