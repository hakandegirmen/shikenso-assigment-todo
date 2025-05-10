export interface Todo {}
export interface Todo {
  id?: number;
  title: string;
  description?: string;
  completed: boolean;
  due_date?: Date | null;
}
