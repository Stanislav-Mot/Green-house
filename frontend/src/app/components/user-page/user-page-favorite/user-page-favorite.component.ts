import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services';

@Component({
  selector: 'user-page-favotire',
  templateUrl: './user-page-favorite.component.html',
  styleUrls: ['./user-page-favorite.component.scss']
})
export class UserPageFavoriteComponent {

  constructor(private authenticationService: AuthenticationService) { }

  logout() {
    this.authenticationService.logout();
  }
 }
