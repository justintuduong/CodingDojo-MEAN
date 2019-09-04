import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})

export class HttpService {
    // tslint:disable-next-line:variable-name
    constructor(private _http: HttpClient) {
        // this.getTasks();
    }

    getTasks() {
        return this._http.get('/tasks');
    }
    getTaskById(id) {
        // console.log('I AM WORKING!!!!');
        return this._http.get('/tasks/' + id);
    }
    addTask(newtask) {
        // console.log('created task');
        return this._http.post('/tasks', newtask);
    }
    // tslint:disable-next-line:variable-name
    editTask(editTask) {
        // console.log(editTask);
        return this._http.put('/tasks/' + editTask.id, editTask);
    }
    deleteTask(id) {
        return this._http.delete('/tasks/' + id);
    }
}
