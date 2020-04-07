import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToDoModel } from '../../../type/toDoModel';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {
  @Input()
  toDo: ToDoModel;

  @Output()
  updateToDo = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  updateToDoHandler() {
    setTimeout(() => {
      this.updateToDo.emit(this.toDo);
    }, 200);
  }

}
