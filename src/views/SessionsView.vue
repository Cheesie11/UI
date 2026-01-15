<template>
  <section class="sessions-wrapper">
    <div class="sessions-header">
      <h1>My Sessions</h1>
      <v-btn color="primary" @click="showNewSessionDialog = true">
        + New Session
      </v-btn>
    </div>

    <v-alert v-if="banner" :type="bannerType" variant="tonal" class="mb-4">
      {{ banner }}
    </v-alert>

    <div v-if="sessions.length === 0" class="no-sessions">
      <p>No sessions yet. Create one to get started!</p>
    </div>

    <div v-else class="sessions-grid">
      <v-card 
        v-for="session in sessions" 
        :key="session.id"
        class="session-card"
        @click="goToSession(session.id)"
      >
        <v-card-title>{{ session.title }}</v-card-title>
        <v-card-subtitle>{{ session.description }}</v-card-subtitle>
        <v-card-text>
          <p><strong>Criteria:</strong> {{ session.criteria.length }}</p>
          <p><strong>Created:</strong> {{ formatDate(session.createdAt) }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn 
            color="error" 
            size="small"
            @click.stop="deleteSessionConfirm(session.id)"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <!-- New Session Dialog -->
    <v-dialog v-model="showNewSessionDialog" max-width="500">
      <v-card>
        <v-card-title>Create New Session</v-card-title>
        <v-card-text>
          <v-form ref="sessionFormRef" @submit.prevent="createNewSession">
            <v-text-field 
              v-model="newSession.title"
              label="Session Title"
              variant="outlined"
              :rules="[rules.required]"
              class="mb-4"
            />
            <v-textarea
              v-model="newSession.description"
              label="Description (optional)"
              variant="outlined"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="showNewSessionDialog = false">Cancel</v-btn>
          <v-btn 
            color="primary"
            @click="createNewSession"
            :loading="loading"
          >
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Confirm Delete Dialog -->
    <v-dialog v-model="showDeleteDialog" max-width="400">
      <v-card>
        <v-card-title>Delete Session</v-card-title>
        <v-card-text>Are you sure you want to delete this session?</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="showDeleteDialog = false">Cancel</v-btn>
          <v-btn 
            color="error"
            @click="confirmDelete"
            :loading="loading"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getUserSessions, createSession, deleteSession } from '../api/sessions';

const router = useRouter();
const route = useRoute();
const sessions = ref([]);
const showNewSessionDialog = ref(false);
const showDeleteDialog = ref(false);
const loading = ref(false);
const banner = ref('');
const bannerType = ref('success');
const sessionFormRef = ref(null);
const sessionToDelete = ref(null);

const newSession = ref({
  title: '',
  description: '',
});

const rules = {
  required: (v) => !!v || 'Required',
};

onMounted(() => {
  loadSessions();
  // Check if we should open the new session dialog
  if (route.query.new === 'true') {
    showNewSessionDialog.value = true;
  }
});

const loadSessions = async () => {
  try {
    const userId = JSON.parse(localStorage.getItem('currentUser'))?.id;
    if (!userId) {
      router.push('/login');
      return;
    }
    const response = await getUserSessions(userId);
    sessions.value = response.data;
  } catch (error) {
    banner.value = 'Failed to load sessions';
    bannerType.value = 'error';
  }
};

const createNewSession = async () => {
  if (!sessionFormRef.value) return;
  const { valid } = await sessionFormRef.value.validate();
  if (!valid) return;

  loading.value = true;
  try {
    const userId = JSON.parse(localStorage.getItem('currentUser'))?.id;
    const response = await createSession({
      userId,
      title: newSession.value.title,
      description: newSession.value.description,
      criteria: [],
    });
    sessions.value.push(response.data);
    banner.value = 'Session created successfully!';
    bannerType.value = 'success';
    showNewSessionDialog.value = false;
    newSession.value = { title: '', description: '' };
  } catch (error) {
    banner.value = 'Failed to create session';
    bannerType.value = 'error';
  } finally {
    loading.value = false;
  }
};

const goToSession = (sessionId) => {
  router.push(`/sessions/${sessionId}`);
};

const deleteSessionConfirm = (sessionId) => {
  sessionToDelete.value = sessionId;
  showDeleteDialog.value = true;
};

const confirmDelete = async () => {
  loading.value = true;
  try {
    await deleteSession(sessionToDelete.value);
    sessions.value = sessions.value.filter(s => s.id !== sessionToDelete.value);
    banner.value = 'Session deleted successfully!';
    showDeleteDialog.value = false;
  } catch (error) {
    banner.value = 'Failed to delete session';
    bannerType.value = 'error';
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};
</script>

<style scoped>
.sessions-wrapper {
  min-height: calc(100vh - 64px);
  padding: 2rem;
}

.sessions-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.sessions-header h1 {
  font-size: 2rem;
  font-weight: 600;
}

.no-sessions {
  text-align: center;
  padding: 4rem 2rem;
  color: rgba(var(--v-theme-on-surface), 0.5);
}

.sessions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.session-card {
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: rgba(var(--v-theme-surface), 0.9);
}

.session-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}
</style>
