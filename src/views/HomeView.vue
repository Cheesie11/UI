<template>
  <div class="content">
    <NewSession @create-form="addForm" />
    <FormList :forms="forms" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api/index.js";
import NewSession from "../components/NewSession.vue";
import FormList from "../components/FormList.vue";

const forms = ref([]);

onMounted(async () => {
  try {
    const response = await api.get("/api/persons");
    forms.value = response.data;
  } catch (error) {
    console.error("Error fetching persons:", error);
  }
});

const addForm = async ({ title, options }) => {
  try {
    const newPerson = {
      firstname: options.firstname,
      lastname: options.lastname,
      subject: title,
      date: new Date().toISOString().split('T')[0],
    };
    const response = await api.post("/api/persons", newPerson);
    forms.value = [response.data, ...forms.value];
  } catch (error) {
    console.error("Error creating person:", error);
  }
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
