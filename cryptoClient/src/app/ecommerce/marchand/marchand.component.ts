import { Component, OnInit } from '@angular/core';
import { EcommerceService } from 'src/app/services/ecommerce/ecommerce.service';

@Component({
  selector: 'app-marchand',
  templateUrl: './marchand.component.html',
  styleUrls: ['./marchand.component.scss']
})
export class MarchandComponent implements OnInit {

  constructor(
    private ecommerceService : EcommerceService
  ) { }

  ngOnInit(): void {
  }

  codeMarchand(){
    this.ecommerceService.codeMarchand()
    .then((result)=>{
      console.log(result);
    })
    .catch((error)=>{
      console.log(error);
    })
  }

}
