import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/data.service';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: SocialUser | undefined;
  loggedIn: boolean | undefined;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private router: Router,
              private dataService: DataService,
              private toastr: ToastrService,
              private socialAuthService: SocialAuthService ) { }



  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user1) => {
      this.user = user1;
      this.loggedIn = (user1 != null)

      console.log(this.user);

      if (user1) {
        this.router.navigate(['/profile'], {state: { data: user1}})
      }
    })
  }


  onSubmit() {
    console.log("form is Submitted");
    console.log(this.loginForm.value);
    this.dataService.login(this.loginForm.value).subscribe(
      (res:any) => {
        console.log(res);
        if (res.success) {
          console.log(res)
          localStorage.setItem('token', res.token)
          this.toastr.success('Login Successfully', 'Success');
          this.router.navigate(['/profile'])

        } else {
          this.toastr.error(res.msg," Error")
        }
      }, error => {
        console.log(error)
        this.toastr.error(error.error.msg)
      }
    )

  }

  signInWithGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
  }

}
