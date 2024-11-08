import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonItem,
  IonList,
  IonButton,
  IonInput,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonText,
  IonDatetime,
  IonCheckbox,
  IonImg,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
  standalone: true,
  imports: [
    IonImg,
    IonCheckbox,
    IonDatetime,
    IonText,
    IonCardHeader,
    IonCardContent,
    IonCard,
    IonInput,
    IonButton,
    IonItem,
    IonLabel,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SignInPage {
  REGEX_VALIDA_EMAIL: string =
    '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';

  userContatoForm: FormGroup;
  isPrimeiroFormularioAparece = true;

  userInformationForm: FormGroup;
  isSegundoFormularioAparece = false;

  registroAlunoForm: FormGroup;
  isTerceiroFormularioAparece = false;

  isAlunoCadastrado = false;

  constructor(private formBuilder: FormBuilder) {
    this.userContatoForm = this.formBuilder.group({
      nome: new FormControl('', Validators.required),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(this.REGEX_VALIDA_EMAIL),
        ])
      ),
      telefone: new FormControl('', Validators.required),
    });

    this.userInformationForm = this.formBuilder.group({
      pesoEmKg: new FormControl(0, Validators.min(1)),
      alturaEmM: new FormControl(0, Validators.min(0.5)),
      graduacao: new FormControl(0),
      diaVencimentoMatricula: new FormControl(new Date(), Validators.required),
    });

    this.registroAlunoForm = this.formBuilder.group({
      diaVencimentoMatricula: new FormControl(new Date(), Validators.required),
      senha: new FormControl('', Validators.required),
      confirmaSenha: new FormControl('', Validators.required),
      termos: new FormControl(true, Validators.pattern('true')),
    });
  }

  segundoForms() {
    this.isPrimeiroFormularioAparece = false;
    this.isSegundoFormularioAparece = true;
    this.isTerceiroFormularioAparece = false;
  }

  terceiroForms() {
    this.isPrimeiroFormularioAparece = false;
    this.isSegundoFormularioAparece = false;
    this.isTerceiroFormularioAparece = true;
  }

  onSubmit() {
    this.isAlunoCadastrado = true;
    this.isPrimeiroFormularioAparece = false;
    this.isSegundoFormularioAparece = false;
    this.isTerceiroFormularioAparece = false;
  }
}
