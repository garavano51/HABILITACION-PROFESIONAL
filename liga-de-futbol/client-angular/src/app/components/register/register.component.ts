import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from "../../services/user.service";
import { FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    providers: [UserService]
})

export class RegisterComponent implements OnInit{
    public title: string;
    public user: User;
    public status: string;
    email  = new FormControl('', [Validators.required, Validators.email]);

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'Iniciar Sesión';
        this.user = new User(1, 'ROLE_USER', '', '', '', '');
    }

    ngOnInit(){
        console.log('Register.component cargado correctamente!!'); 
    }

    getErrorMessage() {
        return this.email.hasError('required') ? 'Debes ingresar un email' :
            this.email.hasError('email') ? 'El email no es válido' : '';
      }

    onSubmit(form){  
        this._userService.register(this.user).subscribe(
            response => {
                if(response.status == 'success'){ 
                    this.status = response.status;
                    // Vaciar el formulario
                    console.log('ENTRO A VACIAR FORMULARIO'); 
                    this.user = new User(1, 'ROLE_USER', '', '', '', '');
                    form.reset();
                }
                else{
                    this.status = 'error';
                }
            },
            error => {  
                console.log(<any>error);
            }
        ); 
    }
}




