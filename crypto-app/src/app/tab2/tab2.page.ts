import { Component } from '@angular/core';
import { AnchorsService } from 'src/app/services/anchors.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
 constructor(
    private anchorServices : AnchorsService
  ) {}

  ngOnInit(): void {
  }
  
  deposit(anchor){
    this.anchorServices.depo(anchor)
    }

}
