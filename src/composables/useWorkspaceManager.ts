// composables/useWorkspaceManager.ts
import { getActivePinia } from 'pinia'
import { createWorkspaceStore } from '@/stores/workspace'

type WorkspaceStore = ReturnType<ReturnType<typeof createWorkspaceStore>>

const workspaces = new Map<number, WorkspaceStore>()

export function useWorkspaceManager() {
  const pinia = getActivePinia()
  if (!pinia) {
    throw new Error('Pinia instance not found — ensure you called app.use(pinia)')
  }

  function createWorkspace(id: number): WorkspaceStore {
    if (workspaces.has(id)) {
      return workspaces.get(id)! 
    }
    const store = createWorkspaceStore(id)()
    workspaces.set(id, store)
    return store
  }

  function getWorkspace(id: number): WorkspaceStore | undefined {
    return workspaces.get(id)
  }

  function removeWorkspace(id: number): void {
    if (!workspaces.has(id)) return
    workspaces.delete(id)
    // Clean up Pinia internal registry to free memory
    const piniaAny = pinia as unknown as { _s: Map<string, unknown> }
    piniaAny._s.delete(`workspace-${id}`)
  }

  function listWorkspaces(): number[] {
    return Array.from(workspaces.keys())
  }

  return {
    createWorkspace,
    getWorkspace,
    removeWorkspace,
    listWorkspaces,
  }
}
