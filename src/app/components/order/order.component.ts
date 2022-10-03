import { Component, OnInit } from '@angular/core';
import { CallbackService } from 'src/app/services/callback.service';
import { NgForm } from '@angular/forms';
import User from 'src/app/interfaces/User';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  message: any = null;
  allert: any = null;
  isErr: boolean = false;
  constructor(private formService: CallbackService, private router: Router) {}

  onClickSubmit(form: NgForm) {
    let user: User = form.value;
    if (user.name.length !== 0 && user.phone.length !== 0) {
      this.formService.setUser(user);
      this.router.navigateByUrl('/confirmation');
    } else {
      this.isErr = true;
      this.allert = 'Введите корректные данные';
    }
  }

  ngOnInit(): void {}
}
