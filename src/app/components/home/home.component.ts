import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myImage:string="assets/car3.jpg"
  constructor(
    public servis : DataService,
    
  ) { }

  ngOnInit(): void {
  }

  
}
