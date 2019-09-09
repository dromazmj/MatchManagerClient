import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AuthenticationUser { 
  username: string;
  password: string;
  token: string;
  rowidUser: string;
}
