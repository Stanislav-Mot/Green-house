import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'
@Component({
  selector: 'redirect-auth',
  templateUrl: './redirect-auth.component.html',
  styleUrls: ['./redirect-auth.component.scss']
})
export class RedirectAuthComponent implements OnInit{

    constructor(private router: Router, private userService: UserService) { }

    ngOnInit(){
        this.userService.activate(this.router.url);
        this.router.navigate(['/']);
    }
}
