import { Component, OnInit } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { UserService } from '../todo-service/todo-service';

import { Todo, TodoResponse } from '../model/todos';
import { ActivatedRoute } from '@angular/router';
//import { TodoItemComponent } from 'src/todo-item/todo-item.component';
declare var M: any;
@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css'],
})
export class ListTodoComponent implements OnInit {
  userService: UserService;
  public todos: Todo[];
  public tache: string = '';
  paramValue: string;
  errorMessage: string;

  constructor(userService: UserService, private route: ActivatedRoute) {
    this.userService = userService;
  }

  // ngOnInit() {
  //  this.todos = this.userService.getTodos();
  //}
  ngOnInit() {
    this.paramValue = this.route.snapshot.paramMap.get('username');
    console.log(this.paramValue + ' EFYYEVHHJEBJEBUJ');
    this.userService
      .getTodos(this.paramValue)
      .pipe(
        map((response: TodoResponse) => response.todos),
        catchError((error) => (this.errorMessage = error.message))
      )
      .subscribe((todos: Todo[]) => (this.todos = todos));
  }

  changeDone(todo: Todo) {
    todo.done = !todo.done;
  }

  refreshTodos() {
    this.userService.getTodos(this.paramValue).subscribe(
      (response: TodoResponse) => {
        this.todos = response.todos;
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des todos : ",
          error
        );
      }
    );
  }

  ajoutTache(newTache: string) {
    console.log(newTache);
    this.tache = newTache;
    this.userService
      .createTodo(this.paramValue, newTache)
      .subscribe((success) => {
        if (success) {
          this.showToast(` Nouvelle tâche ajoutée: ${this.tache}`);
          this.refreshTodos();
        } else {
          this.showToast('Erreur lors de la création du Todo');
        }
        //this.tache = '';
      });
  }

  //onTodoUpdated(todo: Todo) {
  //this.showToast(`La tâche ${todo.label} a été mise à jour`);
  //}
  onTodoUpdated(todo: Todo) {
    this.userService.updateTodo(this.paramValue, todo).subscribe(() => {
      this.showToast(`La tâche ${todo.label} a été mise à jour`);
    });
    //this.refreshTodos();
  }

  deleteTodo(id: string) {
    this.userService.deleteTodo(this.paramValue, id).subscribe((success) => {
      if (success) {
        this.showToast(`Tâche supprimée`);
        this.refreshTodos();
      } else {
        this.showToast('Erreur lors de la suppression du Todo');
      }
    });
  }

  showToast(message: string) {
    M.toast({ html: message });
  }
  //updateToast(todo: Todo) {
  //  this.M.toast({ html: 'La tache todo a été mise à jour' });
  //}
}
