import { Injectable } from '@angular/core';
import { ToDoModel } from '../type/toDoModel';
import { Observable, merge } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, filter, tap, flatMap, reduce, mergeMap } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

@Injectable()
export class ToDoService {
    private httpHandleError: HandleError;

    constructor (
        private http: HttpClient,
        private httpErrorHandler: HttpErrorHandler
    ) {
        this.httpHandleError = httpErrorHandler.createHandleError('ToDoService');
    };

    save (toDoData: ToDoModel): Observable<boolean> {
        return this.http.post<boolean>('/api/toDos', toDoData)
            .pipe(
                catchError(this.httpHandleError<boolean>('save', false))
            );
    }

    update (toDoData: ToDoModel): Observable<boolean> {
        return this.http.put<boolean>(`/api/toDos/${toDoData.id}`, toDoData)
            .pipe(
                catchError(this.httpHandleError('update', false))
            );
    }

    inCompleteToDoList(): Observable<Array<ToDoModel>> {
        return this.http.get<Array<ToDoModel>>('/api/toDos')
            .pipe(
                flatMap((toDos) => toDos),
                filter((toDo: ToDoModel) => !toDo.completed),
                reduce((acc: [], toDo) => {
                    return [...acc, toDo];
                }, []),
                catchError(this.httpHandleError<Array<ToDoModel>>('inCompleteToDoList'))
            )
    }
}
