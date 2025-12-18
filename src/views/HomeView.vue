<template>
  <div class="content">
    <NewSession @create-form="addForm" />
    <FormList :forms="forms" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import NewSession from "../components/NewSession.vue";
import FormList from "../components/FormList.vue";

const forms = ref([]);

const addForm = ({ title, options }) => {
  forms.value = [
    {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now(),
      title,
      options,
      createdAt: new Date().toISOString(),
    },
    ...forms.value,
  ];
};
</script>

<style scoped>
.content {
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
