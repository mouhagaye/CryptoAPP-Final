import { Component, OnInit } from '@angular/core';
import { AnchorsService } from 'src/app/services/anchors.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private anchorServices : AnchorsService
  ) { }

  ngOnInit(): void {
  }

  withdrawal(anchor){
    // let url;
    // console.log(anchor);
    // if (anchor == 'om') {
    //   url = "127.0.0.1:9000"
    // } else if(anchor == 'free' ) {
    //   url = "127.0.0.1:9001"
    // }
    this.anchorServices.withdrawal(anchor)
  }

}


