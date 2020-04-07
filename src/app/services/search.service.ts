import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoModel } from '../type/toDoModel';
import { ToDoService } from '.';
import { flatMap, reduce, filter, catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

@Injectable()
export class SearchService {
  httpHandleError: HandleError;

  constructor(
    private toDoService: ToDoService,
    private httpErrorHandler: HttpErrorHandler
  ) {
    this.httpHandleError = httpErrorHandler.createHandleError('SearchService');
  }

  getSearchFilteredToDos (searchText: string): Observable<Array<ToDoModel>> {
    if (searchText) {
      return this.toDoService.inCompleteToDoList()
        .pipe(
          flatMap((toDos: Array<ToDoModel>) => toDos),
          filter((toDo: ToDoModel) => toDo.title.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) >= 0),
          reduce((acc: [], toDo: ToDoModel) => {
            return [...acc, toDo];
          }, []),
          catchError(this.httpHandleError<Array<ToDoModel>>('getSearchFilteredToDos'))
        )
    } else {
      return this.toDoService.inCompleteToDoList()
        .pipe(
          catchError(this.httpHandleError<Array<ToDoModel>>('getSearchFilteredToDos'))
        )
    }
  }
}
