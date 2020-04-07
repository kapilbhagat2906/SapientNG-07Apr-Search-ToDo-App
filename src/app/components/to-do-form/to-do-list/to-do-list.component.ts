import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToDoModel } from '../../../type/toDoModel';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent {
  @Input()
  toDos: Array<ToDoModel>;

  @Output()
  updateToDoHandler = new EventEmitter();

  updateToDo(toDo: ToDoModel) {
    if (toDo) {
      this.updateToDoHandler.emit(toDo);
    }
  }

}
