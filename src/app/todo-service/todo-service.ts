import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Todo, TodoResponse, UpdateTodo } from '../model/todos';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl =
    'https://europe-west1-cours-angular-263913.cloudfunctions.net/todoapp/todo';

  public todos: Todo[] = [
    { label: 'Max', done: true, id: '0', creationDate: 0 },
    { label: 'PHP', done: false, id: '1', creationDate: 0 },
    { label: 'JAVA', done: true, id: '2', creationDate: 0 },
  ];
  constructor(private http: HttpClient) {}

  //getTodos(): Todo[] {
  //return this.todos;
  //}

  getTodos(username: string): Observable<TodoResponse> {
    const url = `${this.apiUrl}/${username}/todos`;
    return this.http.get<TodoResponse>(url);
  }

  /*createTodo(label: string): void {
    this.todos.push({
      label: label,
      done: false,
      id: Math.floor(Math.random() * 1000).toString(),
      creationDate: new Date().valueOf(),
    });
  }*/
  createTodo(username: string, label: string): Observable<boolean> {
    const url = `${this.apiUrl}/${username}/todos`;
    return this.http.post<Todo>(url, { label }).pipe(
      map(() => true), // Si la requête POST réussit, renvoie true
      catchError(() => throwError(false)) // Si erreur, renvoie false
    );
  }

  //updateTodo(todo: Todo): void {
  //const found = this.todos.findIndex((element) => element.id == todo.id);
  //this.todos[found] = todo;
  //}
  /*updateTodo(username: string, todo: Todo): Observable<UpdateTodo> {
    const url = `${this.apiUrl}/${username}/${todo.id}`;
    return this.http.put<Todo>(url, todo).pipe(
      map((upd: UpdateTodo) => upd.done), // Si la requête PUT réussit, renvoie true
      catchError(() => throwError(false)) // Si erreur, renvoie false
    );
  }*/
  updateTodo(username: string, todo: Todo): Observable<UpdateTodo> {
    const url = `${this.apiUrl}/${username}/${todo.id}`;
    return this.http.put<UpdateTodo>(url, todo).pipe(
      catchError(() => throwError(false)) // Si erreur, renvoie false
    );
  }

  deleteTodo(username: string, id: string): Observable<boolean> {
    const url = `${this.apiUrl}/${username}/todos/${id}`;
    return this.http.delete(url).pipe(
      map(() => true),
      catchError(() => throwError(false))
    );
  }
}
