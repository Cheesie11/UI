<script setup>
import { ref } from 'vue'
import DummyBox from './components/DummyBox.vue'
import FormList from './components/FormList.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'

const forms = ref([])

const addForm = ({ title, options }) => {
  forms.value = [
    {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now(),
      title,
      options,
      createdAt: new Date().toISOString()
    },
    ...forms.value
  ]
}
</script>

<template>
  <v-app>
    <v-app-bar elevation="0">
      <v-app-bar-title class="brand">CodeCriteria</v-app-bar-title>
      <v-spacer />
      <ThemeSwitcher />
    </v-app-bar>

    <v-main class="app-main">
      <div class="content">
        <DummyBox @create-form="addForm" />
        <FormList :forms="forms" />
      </div>
    </v-main>
  </v-app>
</template>

<style scoped>
.brand {
  font-weight: 600;
  font-size: 1.1rem;
}

.app-main {
  background: rgb(var(--v-theme-background));
}

.content {
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
