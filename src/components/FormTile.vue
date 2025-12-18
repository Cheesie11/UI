<script setup>
import { computed } from 'vue'

const props = defineProps({
  form: {
    type: Object,
    required: true
  }
})

const formattedDate = computed(() => {
  if (!props.form?.createdAt) {
    return ''
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium'
  }).format(new Date(props.form.createdAt))
})
</script>

<template>
  <v-card
    class="form-tile"
    elevation="0"
  >
    <div class="header">
      <div>
        <p class="title">
          {{ form.title }}
        </p>
        <p
          v-if="formattedDate"
          class="meta"
        >
          Session created {{ formattedDate }}
        </p>
      </div>

      <v-btn
        icon="mdi-dots-horizontal"
        variant="text"
        color="default"
        aria-label="Session actions"
      />
    </div>

    <div class="options">
      <template v-if="form.options?.length">
        <v-chip
          v-for="option in form.options"
          :key="option"
          size="small"
          color="primary"
          variant="tonal"
        >
          {{ option }}
        </v-chip>
      </template>
      <p
        v-else
        class="meta"
      >
        No criteria selected
      </p>
    </div>
  </v-card>
</template>

<style scoped>
.form-tile {
  border: 1px solid rgba(138, 70, 198, 0.25);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  background-color: rgb(var(--v-theme-surface));
}

.header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #311243;
}

.meta {
  font-size: 0.85rem;
  color: #7e65a2;
  margin: 0.2rem 0 0 0;
}

.options {
  margin-top: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
