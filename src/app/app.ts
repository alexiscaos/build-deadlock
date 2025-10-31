import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShopExplorerComponent } from './Components/shop/shop.explorer.component/shop.explorer.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ShopExplorerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('build-deadlock');
}
