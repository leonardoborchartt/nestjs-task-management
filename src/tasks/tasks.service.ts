import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
//import * as uuid from 'uuid';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { stat } from 'fs';
@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;

        const task: Task = {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN,
        }
        this.tasks.push(task);
        return task;
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTasksById(id);
        task.status = status;
        return task;

    }
}
