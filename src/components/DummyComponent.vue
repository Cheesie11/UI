<template>
  <div class="text-center pa-4">
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          prepend-icon="mdi-cog"
          size="small"
          text="Settings"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card>
        <v-toolbar>
          <v-btn icon="mdi-close" @click="dialog = false"></v-btn>

          <v-toolbar-title>Settings</v-toolbar-title>

          <v-toolbar-items>
            <v-btn text="Save" variant="text" @click="dialog = false"></v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-list lines="two">
          <v-list-subheader>User Controls</v-list-subheader>

          <v-list-item
            subtitle="Set the content filtering level to restrict apps that can be downloaded"
            title="Content filtering"
            link
          ></v-list-item>

          <v-list-item
            subtitle="Require password for purchase or use password to restrict purchase"
            title="Password"
            link
          ></v-list-item>

          <v-divider></v-divider>
        </v-list>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { shallowRef } from "vue";

const dialog = shallowRef(false);
const notifications = shallowRef(false);
const sound = shallowRef(true);
const widgets = shallowRef(false);
</script>
