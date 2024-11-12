import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {
  REGEX_TELEFONE,
  REGEX_VALIDA_EMAIL,
  REGEX_VALIDA_NOME_COMPLETO,
} from 'src/app/helper/constantes';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
})
export class SignInPage {
  userContatoForm: FormGroup;
  isPrimeiroFormularioAparece = true;

  userInformationForm: FormGroup;
  isSegundoFormularioAparece = false;

  registroAlunoForm: FormGroup;
  isTerceiroFormularioAparece = false;

  isAlunoCadastrado = false;
  isAlertAberto = false;
  alertButtons = ['Ok'];

  constructor(private formBuilder: FormBuilder) {
    this.userContatoForm = this.formBuilder.group({
      nome: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(REGEX_VALIDA_NOME_COMPLETO),
        ])
      ),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(REGEX_VALIDA_EMAIL),
        ])
      ),
      telefone: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(REGEX_TELEFONE),
        ])
      ),
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
    if (this.userContatoForm.valid) {
      this.isPrimeiroFormularioAparece = false;
      this.isSegundoFormularioAparece = true;
      this.isTerceiroFormularioAparece = false;
    } else this.setAlertAberto(true);
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

  setAlertAberto(isAberto: boolean) {
    this.isAlertAberto = isAberto;
  }
}
