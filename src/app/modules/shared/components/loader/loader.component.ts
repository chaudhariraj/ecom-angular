import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/Loaders/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  constructor( public  loader: LoaderService) { 
  }
  ngOnInit(): void {
    
  }

}
