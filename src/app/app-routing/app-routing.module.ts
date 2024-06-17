import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { ListTodoComponent } from '../list-todo/list-todo.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'todos/:username', component: ListTodoComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  declarations: [],
})
export class AppRoutingModule {}
