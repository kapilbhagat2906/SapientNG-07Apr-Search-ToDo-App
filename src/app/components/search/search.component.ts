import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { SearchService } from 'src/app/services';
import { ToDoModel } from 'src/app/type/toDoModel';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output()
  searchHandler = new EventEmitter();

  searchForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    /** Form Group and Form Control (for search field) */
    this.searchForm = new FormGroup({
      searchText: new FormControl('')
    });

    /** Search Field value change handler */
    this.searchForm.get('searchText').valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        map((text) => text.trim())
      )
      .subscribe((searchText) => {
        /**
         *  Note: For empty search field, list will be reset.
         *
         *  Moved call to searchService to the parent component i.e. toDoForm component
         *  to have all fetching logic in one place.
         *  This enabled list filteration based on search text during other toDoForm operations (like adding or updating toDo).
         *
         */
        this.searchHandler.emit(searchText);
      })
  }

}
