import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { SearchService, ToDoService } from './services';
import { MessageService } from './message.service';
import { HttpErrorHandler } from './http-error-handler.service';
import { ToDoComponent } from './components/to-do-form/to-do/to-do.component';
import { ToDoListComponent } from './components/to-do-form/to-do-list/to-do-list.component';
import { ToDoFormComponent } from './components/to-do-form/to-do-form.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ToDoComponent,
    ToDoFormComponent,
    ToDoListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    SearchService,
    MessageService,
    HttpErrorHandler,
    ToDoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
