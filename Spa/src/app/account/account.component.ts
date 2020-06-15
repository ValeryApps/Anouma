import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AlertifyService} from "../_services/alertify.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../_models/user";
import {Router} from "@angular/router";
import {AuthService} from "../_services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{

  @Output() cancelRegister = new EventEmitter<boolean>();
  user:any = {};
  registerForm:FormGroup;
  constructor(private authService:AuthService, private alertify:AlertifyService,
              private router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.createFormValidation();
  }
  registerMode = false;
   singUp:FormGroup;
  createFormValidation(){
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password:['', [Validators.required, Validators.minLength(4)]],
      confirmPassword:['', [Validators.required, Validators.minLength(4)]],
    },{validator:this.passwordMatchValidator});
  }

  passwordMatchValidator(fg:FormGroup){
    return fg.get('password').value === fg.get('confirmPassword').value ? null : {'mismatch':true};
  }
  register(){
    if(this.registerForm.valid){
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(()=>{
        this.alertify.success('registered successfully');
      }, error=>{
        this.alertify.error(error.error);
      }, ()=>{
        this.authService.login(this.user).subscribe(()=>{
          this.router.navigate(['/'])
        });
      });
    }
  }

  login(){
    this.authService.login(this.user).subscribe(()=>{
      this.alertify.success("Login successful");
      this.router.navigate(['/'])
    },error => {
     this.alertify.error("Unauthorized")
    })
}

goToRegisterForm(e){
  e.preventDefault()
  this.registerMode = true;
}
  cancel(){
    this.router.navigate(['/'])
  }

}
