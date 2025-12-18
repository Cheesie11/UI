<script setup>
import FormTile from './FormTile.vue'

defineProps({
  forms: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <section class="form-list">
    <template v-if="forms.length">
      <FormTile
        v-for="form in forms"
        :key="form.id"
        :form="form"
      />
    </template>

    <p
      v-else
      class="empty-state"
    >
      No sessions yet - create one to get started
    </p>
  </section>
</template>

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
  border: 1px dashed #d9b7ff;
  border-radius: 8px;
  color: #7442a8;
  font-size: 0.9rem;
  background-color: rgba(218, 182, 252, 0.08);
}
</style>
