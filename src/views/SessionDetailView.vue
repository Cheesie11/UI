<template>
  <section class="session-detail-wrapper">
    <div class="session-header">
      <router-link to="/sessions" class="back-link">&larr; Back to Sessions</router-link>
      <h1>{{ session.title || 'Loading...' }}</h1>
      <v-btn color="primary" @click="showAddCriteriaDialog = true">
        + Add Criteria
      </v-btn>
    </div>

    <v-alert v-if="banner" :type="bannerType" variant="tonal" class="mb-4">
      {{ banner }}
    </v-alert>

    <div v-if="session.description" class="session-description">
      <p>{{ session.description }}</p>
    </div>

    <div v-if="session.criteria && session.criteria.length === 0" class="no-criteria">
      <p>No criteria added yet. Add one to get started!</p>
    </div>

    <div v-else class="criteria-list">
      <div v-for="(criteria, index) in session.criteria" :key="index" class="criteria-item">
        <div class="criteria-header">
          <h3>{{ criteria.id }} - {{ criteria.title }}</h3>
        </div>
        <p class="guiding-question"><strong>Guiding Question:</strong></p>
        <p>{{ criteria.guidingQuestion }}</p>
        
        <div class="quality-levels">
          <h4>Quality Levels (Gütestufe)</h4>
          <div v-for="quality in criteria.qualityLevels" :key="quality.level" class="quality-item">
            <h5>Gütestufe {{ quality.level }}</h5>
            <p>{{ quality.description }}</p>
            <ul>
              <li v-for="(req, i) in quality.requirements" :key="i">{{ req }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Criteria Dialog -->
    <v-dialog v-model="showAddCriteriaDialog" max-width="700">
      <v-card>
        <v-card-title>Add Criteria to Session</v-card-title>
        <v-card-text>
          <v-form ref="criteriaFormRef" @submit.prevent="addNewCriteria">
            <v-text-field 
              v-model="newCriteria.id"
              label="Criteria ID (e.g., A01)"
              variant="outlined"
              :rules="[rules.required]"
              class="mb-4"
            />
            <v-text-field 
              v-model="newCriteria.title"
              label="Title"
              variant="outlined"
              :rules="[rules.required]"
              class="mb-4"
            />
            <v-textarea
              v-model="newCriteria.guidingQuestion"
              label="Guiding Question"
              variant="outlined"
              class="mb-4"
            />
            
            <!-- Quality Levels -->
            <div class="quality-section">
              <h4>Quality Levels (Gütestufe)</h4>
              <div v-for="level in [0, 1, 2, 3]" :key="level" class="quality-input">
                <h5>Gütestufe {{ level }}</h5>
                <v-text-field 
                  v-model="qualityLevels[level].description"
                  :label="`Description for Gütestufe ${level}`"
                  variant="outlined"
                  class="mb-2"
                />
                <v-text-field 
                  v-model="qualityLevels[level].requirementsText"
                  :label="`Requirements for Gütestufe ${level} (comma separated)`"
                  variant="outlined"
                  hint="Enter requirements separated by commas"
                  class="mb-3"
                />
              </div>
            </div>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="showAddCriteriaDialog = false">Cancel</v-btn>
          <v-btn 
            color="primary"
            @click="addNewCriteria"
            :loading="loading"
          >
            Add Criteria
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getSession, addCriteriaToSession } from '../api/sessions';

const route = useRoute();
const router = useRouter();
const session = ref({ criteria: [] });
const showAddCriteriaDialog = ref(false);
const loading = ref(false);
const banner = ref('');
const bannerType = ref('success');
const criteriaFormRef = ref(null);

const newCriteria = ref({
  id: '',
  title: '',
  guidingQuestion: '',
});

const qualityLevels = reactive({
  3: { description: '', requirementsText: '' },
  2: { description: '', requirementsText: '' },
  1: { description: '', requirementsText: '' },
  0: { description: '', requirementsText: '' },
});

const rules = {
  required: (v) => !!v || 'Required',
};

onMounted(() => {
  loadSession();
});

const loadSession = async () => {
  try {
    const response = await getSession(route.params.id);
    session.value = response.data;
  } catch (error) {
    banner.value = 'Failed to load session';
    bannerType.value = 'error';
    setTimeout(() => router.push('/sessions'), 2000);
  }
};

const addNewCriteria = async () => {
  if (!criteriaFormRef.value) return;
  const { valid } = await criteriaFormRef.value.validate();
  if (!valid) return;

  loading.value = true;
  try {
    // Build quality levels array
    const builtQualityLevels = Object.keys(qualityLevels).map(level => ({
      level: parseInt(level),
      description: qualityLevels[level].description,
      requirements: qualityLevels[level].requirementsText
        .split(',')
        .map(r => r.trim())
        .filter(r => r.length > 0),
    }));

    const criteriaData = {
      id: newCriteria.value.id,
      title: newCriteria.value.title,
      guidingQuestion: newCriteria.value.guidingQuestion,
      qualityLevels: builtQualityLevels,
    };

    const response = await addCriteriaToSession(route.params.id, criteriaData);
    session.value = response.data;
    banner.value = 'Criteria added successfully!';
    showAddCriteriaDialog.value = false;
    
    // Reset form
    newCriteria.value = { id: '', title: '', guidingQuestion: '' };
    Object.keys(qualityLevels).forEach(level => {
      qualityLevels[level] = { description: '', requirementsText: '' };
    });
  } catch (error) {
    banner.value = error.response?.data || 'Failed to add criteria';
    bannerType.value = 'error';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.session-detail-wrapper {
  min-height: calc(100vh - 64px);
  padding: 2rem;
}

.session-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.back-link {
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
  font-weight: 500;
}

.back-link:hover {
  text-decoration: underline;
}

.session-header h1 {
  font-size: 1.8rem;
  font-weight: 600;
  flex: 1;
}

.session-description {
  background-color: rgba(var(--v-theme-primary), 0.1);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.no-criteria {
  text-align: center;
  padding: 3rem;
  color: rgba(var(--v-theme-on-surface), 0.5);
}

.criteria-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.criteria-item {
  border: 1px solid rgba(var(--v-theme-primary), 0.2);
  border-radius: 8px;
  padding: 1.5rem;
  background-color: rgba(var(--v-theme-surface), 0.5);
}

.criteria-header {
  border-bottom: 2px solid rgba(var(--v-theme-primary), 0.3);
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.criteria-header h3 {
  margin: 0;
  color: rgb(var(--v-theme-primary));
}

.guiding-question {
  font-weight: 600;
  margin-top: 1rem;
}

.quality-levels {
  margin-top: 1.5rem;
}

.quality-levels h4 {
  margin-bottom: 1rem;
  font-size: 1rem;
}

.quality-item {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: rgba(var(--v-theme-primary), 0.05);
  border-left: 4px solid rgb(var(--v-theme-primary));
  border-radius: 4px;
}

.quality-item h5 {
  margin: 0 0 0.5rem 0;
  color: rgb(var(--v-theme-primary));
}

.quality-item ul {
  margin: 0.5rem 0 0 1.5rem;
  padding: 0;
}

.quality-item li {
  margin-bottom: 0.5rem;
}

.quality-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(var(--v-theme-primary), 0.2);
}

.quality-input {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(var(--v-theme-primary), 0.1);
}

.quality-input h5 {
  margin-bottom: 0.75rem;
}
</style>
