export interface Todo {
  id: number,
  title: string,
  completed: boolean
  owner: string
}

export type Filter = "All" | "Active" | "Done";

export enum Filters {
  ALL = "All",
  ACTIVE = "Active",
  DONE = "Done"
}
