import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Injectable } from "@angular/core";
import { Customer } from '../models/customer';
import { NgForm } from '@angular/forms';



@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  constructor(private httpClient:HttpClient) { }
  apiUrl="https://localhost:44356/api/customers/";


add(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(this.apiUrl+"/add",customer);
  }

  update(customer:Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(this.apiUrl+"/update",customer);
  }


  delete(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(this.apiUrl+"/delete",customer);
  }


 getCustomers():Observable<Customer[]>{
   return this.httpClient.get<Customer[]>(this.apiUrl+"getall");
 }

 getCustomerPhoneNumber(phoneNumber:string):Observable<Customer[]>{
  return this.httpClient.get<Customer[]>(this.apiUrl+"/getbynumber?number=${phoneNumber}");
}

getCustomerName(name:string):Observable<Customer[]>{
  return this.httpClient.get<Customer[]>(this.apiUrl+"/getbyname?name=${name}");
}
}
