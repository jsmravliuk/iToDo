import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { JsonplaceholderService } from '../../services/jsonplaceholder.service';

import { Task } from '../../models/Task';

@Component({
  selector: 'app-list-item-info',
  templateUrl: './list-item-info.component.html',
  styleUrls: ['./list-item-info.component.scss']
})
export class ListItemInfoComponent implements OnInit {

  id: number | string;
  task: Task;

  constructor(
    public route: ActivatedRoute,
    public server: JsonplaceholderService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.server.getTask(this.id).subscribe((data: Task) => {
      if (data) {
        this.task = data;
      }
    }, error => {
      console.log(error);
    });
  }

}
