<script setup lang="ts">
import { provide, onUnmounted } from 'vue'
import { useWorkspaceManager } from '@/composables/useWorkspaceManager'

interface Props {
  id: number
}
const props = defineProps<Props>()

const manager = useWorkspaceManager()
const workspaceStore = manager.createWorkspace(props.id)

// Provide the store to child components
provide('workspaceStore', workspaceStore)

onUnmounted(() => {
  manager.removeWorkspace(props.id)
})
</script>

<template>
  <div class="workspace-tab">
    <slot />
  </div>
</template>
