
import { Component, OnInit, Input } from '@angular/core'; // add Input to our imports
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  stylesUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() taskToShow: any;  // use the @Input decorator to indicate this comes from the parent
  @Input() taskBoolean: boolean;
  constructor() { }
  ngOninit() { }
}
