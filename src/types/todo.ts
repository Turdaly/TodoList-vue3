export interface Todo {
  id: Number,
  title: String,
  completed: Boolean
}

export type Filters = "All" | "Active" | "Done";
