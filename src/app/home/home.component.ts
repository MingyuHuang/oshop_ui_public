import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../dto/user';
import { environment } from '../environments/environment';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name: string | any;
  constructor(private httpClient: HttpClient, private authService: AuthenticationService) { }

  ngOnInit(): void {

  }

} 
