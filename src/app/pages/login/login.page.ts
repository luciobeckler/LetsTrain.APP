import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonText,
  IonFooter,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonList,
  IonIcon,
  IonButton,
  IonButtons,
  IonToggle,
  IonImg,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { REGEX_VALIDA_EMAIL } from 'src/app/helper/constantes';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonImg,
    IonButton,
    IonIcon,
    IonInput,
    IonLabel,
    IonItem,
    IonCardContent,
    IonCard,
    IonText,
    IonContent,
    CommonModule,
    FormsModule,
    IonText,
    IonIcon,
    ReactiveFormsModule,
  ],
})
export class LoginPage {
  constructor(private router: Router, public formBuilder: FormBuilder) {}

  form = this.formBuilder.group({
    email: [''],
    password: [''],
  });

  onSignIn() {
    this.router.navigate(['./sign-in']);
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
