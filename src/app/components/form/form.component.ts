import { Component, OnInit, ViewChild } from '@angular/core';

import { JsonplaceholderService } from '../../services/jsonplaceholder.service';

import { Task } from '../../models/Task';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  title: string;
  isEdit: boolean;
  currentTaskId: number;
  @ViewChild('form') form;

  constructor(
    public server: JsonplaceholderService
  ) { }

  ngOnInit(): void {
    this.server.editingTask.subscribe((task: Task) => {
      if (task.title) {
        this.isEdit = true;
        this.title = task.title;
        this.currentTaskId = task.id;
      }
    });
  }

  addTask() {
    const newTask = {
      userId: 1,
      title: this.title,
      completed: false
    }
    this.server.addTask(newTask).subscribe((data: Task) => {
      this.form.reset();
      this.server.emitNewTask(data);
    });
  }

  editTask() {
    const updateTask = {
      id: this.currentTaskId,
      userId: 1,
      completed: false,
      title: this.title
    };

    this.server.editTask(updateTask).subscribe((task: Task) => {
      this.form.reset();
      this.server.emitUpdateTask(task);
    });
  }
}
