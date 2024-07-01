import { Component, OnInit} from '@angular/core';
import { KeycloakService } from '../../Services/KeyCloak/keycloak.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor(
    private KeycloakService: KeycloakService
  ){}

  async ngOnInit():Promise<void> {
    await this.KeycloakService.init();
    await this.KeycloakService.login();
    }
}
