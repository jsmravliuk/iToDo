import { Component, OnInit } from '@angular/core';

import { JsonplaceholderService } from '../../services/jsonplaceholder.service';

import { Task } from '../../models/Task';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  tasks: Task[];

  constructor(
    public server: JsonplaceholderService
  ) { }

  ngOnInit(): void {
    this.server.getTasks().subscribe((data: Task[]) => {
      if (data) {
        this.tasks = data;
      }
    }, error => {
      console.log(error);
    });

    this.server.newTask.subscribe((data: Task) => {
      if (data['body']) {
        const newTask = Object.assign({}, data['body'], { id: data.id });
        this.tasks.unshift(newTask);
        this.server.updateCount(this.tasks.length);
      }
    });

    this.server.updatingTask.subscribe((task: Task) => {
      if (task['body']) {
        this.tasks = this.tasks.map(item => {
          if (item.id === task.id) {
            item.title = task['body'].title;
          }
          return item;
        });
      }
    });
  }

  deleteTask(id: number) {
    this.server.deleteTask(id).subscribe(data => {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.server.updateCount(this.tasks.length);
    });
  }

  editTask(task: Task) {
    this.server.emitEditTask(task);
  }

  identify(index) {
    return index;
  }
}
