<template>
  <v-dialog v-model="dialog" max-width="520">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        color="primary"
        variant="flat"
        icon="mdi-plus"
        rounded="pill"
        aria-label="Create new session"
      />
    </template>

    <v-card>
      <v-card-title class="card-title">
        <div class="title-wrap">
          <v-icon icon="mdi-clipboard-text-outline" />
          <h2>Create a new session</h2>
        </div>

        <v-btn icon="mdi-close" variant="text" @click="close" />
      </v-card-title>

      <v-card-text class="card-body">
        <v-text-field
          v-model="title"
          label="Session title"
          placeholder="Trial IPA"
          :error="!!titleError"
          :error-messages="titleError"
          @update:model-value="titleError = ''"
          autofocus
          variant="outlined"
        />

        <v-select
          v-model="selectedOptions"
          :items="optionList"
          label="Sections"
          multiple
          chips
          closable-chips
          variant="outlined"
          menu-icon="mdi-chevron-down"
        >
          <template #item="{ props, item }">
            <v-list-item v-bind="props">
              <template #prepend>
                <v-checkbox-btn
                  :model-value="selectedOptions.includes(item.value)"
                />
              </template>
            </v-list-item>
          </template>
        </v-select>
      </v-card-text>

      <v-divider class="my-2"></v-divider>

      <v-card-actions class="card-actions">
        <v-btn variant="text" @click="close">Cancel</v-btn>
        <v-btn color="primary" variant="flat" @click="save">
          Create session
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["save"]);

const dialog = ref(false);

const optionList = [
  "Clarity of communication",
  "Technical depth",
  "Collaboration readiness",
  "User impact",
];

const title = ref("");
const selectedOptions = ref([]);
const titleError = ref("");

const reset = () => {
  title.value = "";
  selectedOptions.value = [];
  titleError.value = "";
};

const close = () => {
  dialog.value = false;
  reset();
};

const save = () => {
  if (!title.value.trim()) {
    titleError.value = "Please enter a session title.";
    return;
  }

  emit("save", {
    title: title.value.trim(),
    options: [...selectedOptions.value],
  });

  close();
};
</script>

<style scoped>
.card-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.title-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-title h2 {
  margin: 0;
  font-size: 1.35rem;
  color: #311243;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.card-actions {
  display: flex;
  gap: 15px;
  align-items: center;
  padding-bottom: 1.5rem;
}
</style>
