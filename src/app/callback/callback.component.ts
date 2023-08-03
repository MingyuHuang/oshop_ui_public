import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(param => {
      console.log(param);
      this.authService.fetchToken(param['code'], param['state']).subscribe(data => {

        this.authService.updateToken(data.token);
        this.router.navigate([localStorage.getItem('returnUrl') as string]).then(() => {
          window.location.reload();
        });
      })
    });
  }

}
