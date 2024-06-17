import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { CustomPipePipe } from './app/custom-pipe.pipe';
import { ListTodoComponent } from './app/list-todo/list-todo.component';
import { TodoFormComponent } from './app/todo-form/todo-form.component';
import { TodoItemComponent } from './app/todo-item/todo-item.component';
import { LoginComponent } from './app/login/login.component';
import { RouterModule } from '@angular/router';
import { routes } from './app/app-routing/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [
    AppComponent,
    ListTodoComponent,
    LoginComponent,
    TodoItemComponent,
    TodoFormComponent,
    CustomPipePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
