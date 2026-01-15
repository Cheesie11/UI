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
        
        <div class="quality-levels">
          <h4>Requirements erfüllen</h4>
          <div class="requirements-list">
            <div v-for="(req, i) in getGueterstufe3Requirements(criteria)" :key="i" class="requirement-item">
              <v-checkbox
                :model-value="isRequirementFulfilled(criteria, 3, i)"
                @update:model-value="toggleRequirement(criteria, 3, i)"
                :label="req"
                density="compact"
              />
            </div>
          </div>
        </div>

        <div class="criteria-score">
          <strong>Erreichte Gütestufe:</strong> 
          <span class="score-badge">{{ calculateCriteriaScore(criteria) }}</span>
        </div>
      </div>

      <div v-if="session.criteria.length > 0" class="overall-score">
        <h3>Durchschnittliche Punktzahl: <span class="score-value">{{ calculateOverallScore().toFixed(2) }}</span></h3>
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
            
            <!-- Quality Levels -->
            <div class="quality-section">
              <h4>Requirements für Gütestufe 3</h4>
              <p class="quality-hint">Geben Sie die einzelnen Anforderungen ein (eine pro Zeile)</p>
              <v-textarea
                v-model="newCriteria.requirementsText"
                label="Requirements (eine pro Zeile)"
                variant="outlined"
                rows="6"
                hint="Beispiel: 1. Die verwendeten Informationen...\n2. Es werden geeignete Visualisierungsmethoden..."
                class="mb-4"
              />
              <p class="quality-note">Gütestufe 2, 1 und 0 werden automatisch basierend auf erfüllten Requirements berechnet.</p>
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
import { getSession, addCriteriaToSession, updateSession } from '../api/sessions';

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
  requirementsText: '',
});

const rules = {
  required: (v) => !!v || 'Required',
};

const sortedQualityLevels = (levels) => {
  if (!levels) return [];
  return [...levels].sort((a, b) => b.level - a.level);
};

const getGueterstufe3Requirements = (criteria) => {
  if (!criteria.qualityLevels) return [];
  const stufe3 = criteria.qualityLevels.find(q => q.level === 3);
  return stufe3 ? stufe3.requirements : [];
};

const isRequirementFulfilled = (criteria, level, requirementIndex) => {
  if (!criteria.fulfilledRequirements) {
    criteria.fulfilledRequirements = {};
  }
  const key = `${level}-${requirementIndex}`;
  return criteria.fulfilledRequirements[key] || false;
};

const toggleRequirement = async (criteria, level, requirementIndex) => {
  if (!criteria.fulfilledRequirements) {
    criteria.fulfilledRequirements = {};
  }
  const key = `${level}-${requirementIndex}`;
  criteria.fulfilledRequirements[key] = !criteria.fulfilledRequirements[key];
  
  // Save to backend
  try {
    await updateSession(route.params.id, {
      userId: JSON.parse(localStorage.getItem('currentUser'))?.id,
      title: session.value.title,
      description: session.value.description,
      criteria: session.value.criteria,
    });
  } catch (error) {
    console.error('Error updating session:', error);
  }
};

const calculateCriteriaScore = (criteria) => {
  if (!criteria.qualityLevels || criteria.qualityLevels.length === 0) return 0;
  
  // Get Gütestufe 3 requirements count
  const stufe3 = criteria.qualityLevels.find(q => q.level === 3);
  if (!stufe3 || !stufe3.requirements) return 0;
  
  const totalRequirements = stufe3.requirements.length;
  const fulfilledCount = stufe3.requirements.filter((_, i) => 
    isRequirementFulfilled(criteria, 3, i)
  ).length;
  
  // Calculate which level is achieved
  if (fulfilledCount === totalRequirements) return 3;
  if (fulfilledCount >= Math.ceil(totalRequirements * 0.75)) return 2;
  if (fulfilledCount >= Math.ceil(totalRequirements * 0.5)) return 1;
  return 0;
};

const calculateOverallScore = () => {
  if (!session.value.criteria || session.value.criteria.length === 0) return 0;
  
  const totalScore = session.value.criteria.reduce((sum, criteria) => {
    return sum + calculateCriteriaScore(criteria);
  }, 0);
  
  return totalScore / session.value.criteria.length;
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
    // Parse requirements from textarea (one per line)
    const requirements = newCriteria.value.requirementsText
      .split('\n')
      .map(r => r.trim())
      .filter(r => r.length > 0);

    // Generate all quality levels automatically
    const qualityLevels = [
      {
        level: 3,
        description: `Alle ${requirements.length} Punkte sind erfüllt.`,
        requirements: requirements,
      },
      {
        level: 2,
        description: `${Math.ceil(requirements.length * 0.75)} Punkte sind erfüllt.`,
        requirements: [`${Math.ceil(requirements.length * 0.75)} der ${requirements.length} Anforderungen sind erfüllt.`],
      },
      {
        level: 1,
        description: `${Math.ceil(requirements.length * 0.5)} Punkte sind erfüllt.`,
        requirements: [`${Math.ceil(requirements.length * 0.5)} der ${requirements.length} Anforderungen sind erfüllt.`],
      },
      {
        level: 0,
        description: `Weniger als ${Math.ceil(requirements.length * 0.5)} Punkte sind erfüllt.`,
        requirements: [`Weniger als ${Math.ceil(requirements.length * 0.5)} der ${requirements.length} Anforderungen sind erfüllt.`],
      },
    ];

    const criteriaData = {
      id: newCriteria.value.id,
      title: newCriteria.value.title,
      qualityLevels: qualityLevels,
    };

    const response = await addCriteriaToSession(route.params.id, criteriaData);
    session.value = response.data;
    banner.value = 'Criteria added successfully!';
    showAddCriteriaDialog.value = false;
    
    // Reset form
    newCriteria.value = { id: '', title: '', requirementsText: '' };
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

.requirements-list {
  margin: 0.5rem 0 0 0;
  padding: 0;
}

.requirement-item {
  margin-bottom: 0.5rem;
  padding-left: 0.5rem;
}

.criteria-score {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: rgba(var(--v-theme-secondary), 0.1);
  border-left: 4px solid rgb(var(--v-theme-secondary));
  border-radius: 4px;
}

.score-badge {
  display: inline-block;
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-secondary)));
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-weight: bold;
  margin-left: 0.5rem;
}

.overall-score {
  margin-top: 3rem;
  padding: 2rem;
  background-color: rgba(var(--v-theme-primary), 0.1);
  border: 2px solid rgb(var(--v-theme-primary));
  border-radius: 8px;
  text-align: center;
}

.overall-score h3 {
  margin: 0;
}

.score-value {
  color: rgb(var(--v-theme-primary));
  font-weight: 700;
  font-size: 1.5rem;
}

.quality-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(var(--v-theme-primary), 0.2);
}

.quality-hint {
  font-size: 0.9rem;
  color: rgba(var(--v-theme-on-surface), 0.6);
  margin-bottom: 1rem;
  font-style: italic;
}

.quality-note {
  font-size: 0.85rem;
  color: rgba(var(--v-theme-secondary), 0.8);
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: rgba(var(--v-theme-secondary), 0.1);
  border-left: 3px solid rgb(var(--v-theme-secondary));
  border-radius: 4px;
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
