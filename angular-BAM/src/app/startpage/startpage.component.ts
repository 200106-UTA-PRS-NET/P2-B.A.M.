import { Component, OnInit } from '@angular/core';
import { login } from '../login';
@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})
export class StartpageComponent implements OnInit {
  chosen : string;

  username : string;

  password : string;

  currentLogin : login;

  choice(c:string): void {
    this.chosen = c;
  }

  register(): void{

  }

  constructor() { }

  ngOnInit(): void {
    this.username = "a";
    this.password = "b";
  }

}
