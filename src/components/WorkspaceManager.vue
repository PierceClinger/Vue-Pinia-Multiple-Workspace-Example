<script setup lang="ts">
import { ref } from 'vue'
import { useWorkspaceManager } from '@/composables/useWorkspaceManager'
import WorkspaceTab from './WorkspaceTab.vue'
import DataDisplay from './DataDisplay.vue'

const manager = useWorkspaceManager()

const workspaceIds = ref<number[]>([])
const activeTab = ref<number | null>(null)

function addWorkspace() {
  const newId = Date.now()
  workspaceIds.value.push(newId)
  manager.createWorkspace(newId)
  activeTab.value = newId
}

function closeWorkspace(id: number) {
  workspaceIds.value = workspaceIds.value.filter(w => w !== id)
  manager.removeWorkspace(id)
  if (activeTab.value === id) {
    activeTab.value = workspaceIds.value[0] ?? null
  }
}

// initialize one workspace
addWorkspace()
</script>

<template>
  <div>
    <v-tabs v-model="activeTab" grow>
      <v-tab
        v-for="id in workspaceIds"
        :key="id"
        :value="id"
        class="d-flex align-center"
      >
        <span class="mr-2">Workspace {{ id }}</span>
        <v-btn icon="mdi-close" size="x-small" variant="text" @click.stop="closeWorkspace(id)" />
      </v-tab>
      <v-tab>
        <v-btn icon="mdi-plus" variant="text" @click="addWorkspace" />
      </v-tab>
    </v-tabs>

    <v-window v-model="activeTab" class="mt-4">
      <v-window-item
        v-for="id in workspaceIds"
        :key="id"
        :value="id"
      >
        <WorkspaceTab :id="id">
          <v-card class="ma-4 pa-4" elevation="2">
            <DataDisplay />
          </v-card>
        </WorkspaceTab>
      </v-window-item>
    </v-window>
  </div>
</template>
