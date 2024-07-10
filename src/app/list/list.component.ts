import { Component, OnInit } from '@angular/core';
import {Todolist} from '../models/todolist';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  // appointment : Todolist = {
  //   id: 1,
  //   title: 'Eat at Cafe',
  //   date: new Date('2024-03-21'),
  // }

   //create new todolist
   newTodolistTitle : string = '';
   newTodolistDate : Date = new Date();

  appointments : Todolist[] = []

  //OnInit -> for when we reload the page, the data is still exist (Because the data is exist on local storage but dont appear on webpage)
  ngOnInit(): void {
    console.log("Testing load data")
    let savedItems = localStorage.getItem("appointments")
    this.appointments = savedItems ? JSON.parse(savedItems) : []
  }

  //button method:
  addTodo() {
    //to check it response:
    // alert(this.newTodolistTitle+" "+ this.newTodolistDate);

    //check if have any value:
    if(this.newTodolistTitle.trim().length && this.newTodolistDate) {
      let newTodolist: Todolist = {
        id: Date.now(),
        title: this.newTodolistTitle,
        date: this.newTodolistDate,
      }
      this.appointments.push(newTodolist);

      //when click add -> reset back 
      this.newTodolistTitle = '';
      this.newTodolistDate = new Date();

      alert(this.appointments.length); //see how many elements

      //put data to session local storage (not DB):
      localStorage.setItem("appointments", JSON.stringify(this.appointments));

    }
  }

  //delete method:
  deleteTodolist(index: number){
    this.appointments.splice(index,1);
  //remove data to session local storage (not DB):
  localStorage.setItem("appointments", JSON.stringify(this.appointments));
  }

}
