import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../../services/to-do.service';
import { ToDoModel } from '../../type/toDoModel';
import { MessageService } from 'src/app/message.service';
import { SearchService } from 'src/app/services';

@Component({
  selector: 'app-to-do-form',
  templateUrl: './to-do-form.component.html',
  styleUrls: ['./to-do-form.component.scss']
})
export class ToDoFormComponent implements OnInit {

  toDoList: Array<ToDoModel>;
  toDoTitle: string;
  searchText: string = '';

  constructor(
    private toDoService: ToDoService,
    public messageService: MessageService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.searchService.getSearchFilteredToDos(this.searchText)
      .subscribe((data) => {
        this.toDoList = data;
      });
  }

  updateToDoHandler (toDo: ToDoModel) {
    this.toDoService.update(toDo)
      .subscribe((isToDoUpdated) => {
        if (isToDoUpdated) {
          this.searchService.getSearchFilteredToDos(this.searchText)
            .subscribe((data) => {
              this.toDoList = data;
            });
        }
      });
  }

  saveToDo () {
    if (this.toDoTitle) {
      this.toDoService.save(new ToDoModel(this.toDoTitle, false))
        .subscribe((isToDoSaved) => {
          if (isToDoSaved) {
            this.toDoTitle = '';
            this.searchService.getSearchFilteredToDos(this.searchText)
              .subscribe((data) => {
                this.toDoList = data;
              });
          }
        });
    }
  }

  searchHandler (searchText: string): void {
    console.log(searchText);
    this.searchText = searchText;
    this.searchService.getSearchFilteredToDos(searchText)
      .subscribe((toDos: Array<ToDoModel>) => {
        this.toDoList = toDos;
      });
  }

}
