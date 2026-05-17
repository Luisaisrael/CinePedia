import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuNavegacao } from "./shared/components/menu-navegacao/menu-navegacao";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuNavegacao],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('CinePedia');
}
