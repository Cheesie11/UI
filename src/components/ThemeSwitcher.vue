<template>
  <v-btn icon variant="text" color="primary" @click="toggleTheme" aria-label="Toggle theme">
    <v-icon :icon="iconName" />
  </v-btn>
</template>

<script setup>
import { computed } from "vue";
import { useTheme } from "vuetify";

const theme = useTheme();

const isDark = computed(() => theme.global.current.value.dark);

const toggleTheme = () => {
  theme.global.name.value = isDark.value ? "light" : "dark";
};

const iconName = computed(() =>
  isDark.value ? "mdi-weather-sunny" : "mdi-weather-night"
);
</script>
