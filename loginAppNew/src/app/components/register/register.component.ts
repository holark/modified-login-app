import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    name: new FormControl('', ),
    address: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(public toastr: ToastrService,
              private dataService: DataService,
              private router: Router) { }

  ngOnInit(): void {
  }

  // onRegister() {
  //   this.toastr.success('Registration Form Submitted Successfully', 'Success!');


  // }

  onSubmit() {
    console.log(this.registerForm.value);

    this.dataService.register(this.registerForm.value).subscribe(
      (res: any) => {
        console.log(res);
        if(res.success){
          this.toastr.success('User Registered Successfully')
          this.router.navigate(['/login'])

        } else {
          this.toastr.error(res.msg)
        }
      }, error => {
        console.log(error);

        this.toastr.error(error.error.msg)

      }

    );

  }
}
