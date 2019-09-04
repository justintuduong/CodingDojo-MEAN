
import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    // tslint:disable-next-line:variable-name
    title = 'Mean';
    tasks = [];
    taskDescription = {};
    requested = false;
    newTask: any;
    edit = false;
    editTask: any;
    editShow = false;
    selectedTask= {};
    // tslint:disable-next-line:no-inferrable-types
    showTaskInComp: boolean = false;

    // tslint:disable-next-line:variable-name
    constructor(private _httpService: HttpService) { }
    ngOnInit() {
        this.newTask = { title: '', description: '' };
        this.editTask = { title: '', description: '' };
    }
    // --------------------------------------------------------------------------

    getAllTasks() {
        // tslint:disable-next-line:prefer-const
        let observable = this._httpService.getTasks();
        observable.subscribe(data => {
            console.log('Got our tasks!', data);
            console.log(data.data);
            // tslint:disable-next-line:no-string-literal
            this.tasks = data.data;
        });
    }
    // --------------------------------------------------------------------------

    getTaskById(id) {
        console.log(id, "working");
        let observable = this._httpService.getTaskById(id);
        observable.subscribe(data => {
            console.log('Got our tasks!', data);
            console.log(data);
            // tslint:disable-next-line:no-string-literal
            this.taskDescription = data.data;
            this.selectedTask = this.taskDescription;
            console.log("hello", this.selectedTask);
            this.requested = true;
        });
    }
    // --------------------------------------------------------------------------

    onCreate() {
        // tslint:disable-next-line:prefer-const
        let observable = this._httpService.addTask(this.newTask);
        observable.subscribe(data => {
            console.log('subscribing now!', data);
            this.newTask = { title: '', description: '' };
            this.getAllTasks();
        });
    }
    // --------------------------------------------------------------------------

    // tslint:disable-next-line:variable-name
    editForm(task) {
        this.editTask = { title: task.title, description: task.description, id: task._id };
        this.editShow = true;
    }

    // --------------------------------------------------------------------------

    onEdit() {
        // tslint:disable-next-line:prefer-const
        let observable = this._httpService.editTask(this.editTask);
        observable.subscribe(data => {
            console.log('Got our tasks!', data);
            this.editShow = false;
            this.getAllTasks();
        });
    }

    // --------------------------------------------------------------------------
    deleteTask(id) {
        // tslint:disable-next-line:prefer-const
        let observable = this._httpService.deleteTask(id);
        observable.subscribe(data => {
            this.tasks = data.data;
            this.getAllTasks();
        });
    }
}




