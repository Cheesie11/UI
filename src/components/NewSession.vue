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
  border-radius: 12px;
background-color: rgba(218, 182, 252, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 8px 30px rgba(80, 30, 120, 0.08);
}

.eyebrow {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #8746c6;
  margin: 0 0 0.25rem 0;
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: #311243;
}
</style>
