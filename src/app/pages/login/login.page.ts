import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  ],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  showPassword: boolean = false;

  onSignIn() {
    this.router.navigate(['./sign-in']);
  }

  onLogin() {
    this.router.navigate(['./home']);
  }

  limpaEmail() {
    this.email = '';
  }

  trocaVisibilidadeSenha() {
    this.showPassword = !this.showPassword;
  }

  constructor(private router: Router) {}
}
