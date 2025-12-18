<script setup>
import { ref } from "vue";
import CreateFormDialog from "./Dialog.vue";

const emit = defineEmits(["create-form"]);

const handleSave = (payload) => {
  emit("create-form", payload);
};
</script>

<template>
  <div class="wrapper">
    <v-card class="form-box" elevation="0">
      <div>
        <p class="eyebrow">Sessions</p>
        <p class="title">Create a new session</p>
      </div>

      <CreateFormDialog @save="handleSave" />
    </v-card>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-box {
  padding: 1.5rem;
  border-radius: 16px;
  background-color: rgba(var(--v-theme-surface), 0.95);
  border: 1px solid rgba(var(--v-theme-primary), 0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 18px 40px rgba(8, 10, 18, 0.4);
}

.eyebrow {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(var(--v-theme-primary), 0.75);
  margin: 0 0 0.25rem 0;
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: rgb(var(--v-theme-on-surface));
}
</style>
