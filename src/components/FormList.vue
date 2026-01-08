<template>
  <section class="form-list">
    <template v-if="forms.length">
      <FormTile v-for="form in forms" :key="form.id" :form="form" />
    </template>

    <p v-else class="empty-state">
      No sessions yet - create one to get started
    </p>
  </section>
</template>

<script setup>
import FormTile from "./FormTile.vue";

defineProps({
  forms: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped>
.form-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.empty-state {
  margin: 0;
  padding: 1rem;
  border: 1px dashed rgba(var(--v-theme-primary), 0.4);
  border-radius: 10px;
  color: rgba(var(--v-theme-on-background), 0.85);
  font-size: 0.9rem;
  background-color: rgba(var(--v-theme-primary), 0.08);
}
</style>
