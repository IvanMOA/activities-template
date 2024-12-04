export class Task {
    id: number;
    title: string;
    completed: boolean;

    constructor(id: number, title: string, completed = false) {
        this.id = id;
        this.title = title;
        this.completed = completed;
    }
}

type GetTasksOptions = {
    filters?: {
        completed?: boolean;
    };
};

export class TaskManager {
    private tasks: Task[] = [];
    addTask(title: string) {
        // Implementar
    }
    deleteTask(id: number) {
        // Implementar
    }
    getTasks(options?: GetTasksOptions): Task[] {
        // Implementar
        return [];
    }
    completeTask(id: number) {
        // Implementar
    }
}
