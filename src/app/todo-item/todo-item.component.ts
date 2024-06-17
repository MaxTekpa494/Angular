import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../model/todos';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input()
  item: Todo;
  @Output()
  newItemEvent = new EventEmitter<Todo>();
  @Output()
  changeItemEvent = new EventEmitter<Todo>();
  @Output() deleteItemEvent = new EventEmitter<string>();
  modif: boolean = false;
  editedLabel: string = '';

  constructor() {}

  ngOnInit() {}

  changeValue() {
    this.newItemEvent.emit(this.item);
  }

  test() {
    this.item.done = !this.item.done;
  }

  modifLabel() {
    this.modif = !this.modif;
    this.editedLabel = this.item.label;
  }

  onEditDone() {
    this.changeItemEvent.emit(this.item);
    this.item.label = this.editedLabel;
    this.modif = false;
  }

  onDelete() {
    this.deleteItemEvent.emit(this.item.id);
  }
}
