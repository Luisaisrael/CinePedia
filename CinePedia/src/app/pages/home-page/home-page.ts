import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; //importa o RouterLink para usar o routerLink no html
import { MenuNavegacao } from '../../shared/components/menu-navegacao/menu-navegacao';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MenuNavegacao, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

}
