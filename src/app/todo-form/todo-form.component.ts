import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  public tache: string = '';
  @Output() newTache = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}

  transmitTache() {
    //console.log(`La nouvelle tache marche ${this.tache}`);
    this.newTache.emit(this.tache);
    this.tache = '';
  }
}
