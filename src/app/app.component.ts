import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'vezuedu';
  ngOnInit(): void {
    let x = localStorage.getItem('cart');
    if (x === null) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
  }
}
