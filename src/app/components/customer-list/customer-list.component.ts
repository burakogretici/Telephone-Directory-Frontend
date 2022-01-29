import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { ModalDismissReasons,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  providers: [CustomerService]
})
export class CustomerListComponent implements OnInit {

  closeResult:string | undefined;
  customer: Customer[] = [];
  constructor(private customerService:CustomerService, private activatedRoute: ActivatedRoute,private modalService:NgbModal,private httpClient:HttpClient) { }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
    add(customer: NgForm) {
      const url = 'https://localhost:44356/api/Customers/add';
      this.httpClient.post(url, customer.value)
        .subscribe((result) => {
          this.ngOnInit(); //reload the table
        });
      this.modalService.dismissAll(); //dismiss the modal
    }

    update(customer: NgForm) {
      const url = 'https://localhost:44356/api/Customers/update';
      this.httpClient.post(url, customer.value)
        .subscribe((result) => {
          this.ngOnInit(); //reload the table
        });
      this.modalService.dismissAll(); //dismiss the modal
    }

    delete(customer:Customer){
      this.customerService.delete(customer);
    }

  customers:Customer[]=[];
  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(data=>{this.customers=data})


  }

}
