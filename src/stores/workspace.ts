import { defineStore } from 'pinia'

export interface WorkspaceState {
  id: number
  data: string
}

export const createWorkspaceStore = (workspaceId: number) =>
  defineStore(`workspace-${workspaceId}`, {
    state: (): WorkspaceState => ({
      id: workspaceId,
      data: "",
    }),
    actions: {
      saveData(data: string) {
        this.data = data
      },
      clearData() {
        this.data = ""
      }
    }
  })

