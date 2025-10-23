<script setup lang="ts">
import { inject } from 'vue'
import type { WorkspaceState } from '@/stores/workspace'

const data = ref("");

const workspaceStore = inject<WorkspaceState & { 
    saveData: (data: string) => void,
    clearData: () => void
}>('workspaceStore')

if (!workspaceStore) {
  throw new Error('workspaceStore not provided')
}

const currentData = computed(() => {
    return workspaceStore?.data
})

function saveData() {
  workspaceStore?.saveData(data.value)
}

function clearData() {
  workspaceStore?.clearData()
}
</script>

<template>
  <div>
    <h4>Workspace {{ workspaceStore.id }}</h4>
    <v-row>
        <v-col>
            <v-text-field
                v-model="data"
                label="Input Value"
            />
        </v-col>
        <v-col>
            <v-text-field
                :model-value="currentData"
                label="Saved Value"
                readonly
            />
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="2">
            <v-btn color="primary" class="mb-2" @click="saveData">
              Add Data
            </v-btn>
        </v-col>
        <v-col cols="2">
            <v-btn color="primary" class="mb-2" @click="clearData">
              Clear Data
            </v-btn>
        </v-col>
    </v-row>
  </div>
</template>
