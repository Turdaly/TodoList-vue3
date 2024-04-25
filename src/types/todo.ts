export interface Todo {
  id: number,
  title: string,
  completed: boolean
  owner: string
}

export type Filters = "All" | "Active" | "Done";
