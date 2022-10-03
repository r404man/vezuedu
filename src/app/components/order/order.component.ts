import { Component, OnInit } from '@angular/core';
import { CallbackService } from 'src/app/services/callback.service';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
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
  constructor(
    private formService: CallbackService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: [''],
      date: [''],
      time: [''],
    });
  }
  form: any;

  get name() {
    return this.form.get('name');
  }
  get phone() {
    return this.form.get('phone');
  }
  onClickSubmit() {
    let user: User = this.form.value;
    if (user.name.length !== 0 && user.phone.length !== 0) {
      this.formService.setUser(user);
      this.router.navigateByUrl('/confirmation');
    } else {
      this.isErr = true;
      this.allert = 'Введите корректные данные';
    }
  }

  ngOnInit(): void {
    let user = this.formService.getUser();
    if (user !== null) {
      if (user!.name.length !== 0 && user!.phone.length !== 0) {
        this.form = this.fb.group({
          name: [`${user?.name}`, Validators.required],
          phone: [`${user?.phone}`, Validators.required],
          address: [''],
          date: [''],
          time: [''],
        });
      }
    }
  }
}
