import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userName = new FormControl('');
  constructor(private router: Router) {}

  ngOnInit() {}

  changeCompo() {
    const userNameValue = this.userName.value;
    console.log(userNameValue);
    this.router.navigate([`/todos/${userNameValue}`]);
  }
}
