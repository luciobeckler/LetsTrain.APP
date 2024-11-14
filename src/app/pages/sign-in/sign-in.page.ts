import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {
  REGEX_SENHA,
  REGEX_TELEFONE,
  REGEX_VALIDA_EMAIL,
  REGEX_VALIDA_NOME_COMPLETO,
} from 'src/app/helper/constantes';
import { ArrayType } from '@angular/compiler';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
})
export class SignInPage {
  form: FormGroup;

  exibeCards: boolean[] = [true, false, false];

  isAlunoCadastrado = false;
  isAlertAberto = false;
  alertButtons = ['Ok'];

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.exibeCards = [true, false, false];

    this.form = this.formBuilder.group(
      {
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
        pesoEmKg: new FormControl(0),
        alturaEmM: new FormControl(0),
        graduacao: new FormControl(0),
        diaVencimentoMatricula: new FormControl(
          1,
          Validators.compose([
            Validators.required,
            Validators.min(1),
            Validators.max(31),
          ])
        ),
        senha: new FormControl('', [
          Validators.required,
          Validators.pattern(REGEX_SENHA),
        ]),
        confirmaSenha: new FormControl('', Validators.required),
        termos: new FormControl(false, Validators.pattern('true')),
      },
      { validators: this.confirmPasswordValidator }
    );
  }

  fechaCardAtualMostraProximoValidandoCardAtual(
    numeroCardAtual: number,
    numeroCardNovo: number
  ) {
    if (numeroCardNovo === 3) {
      this.exibeCards[0] = false;
      this.exibeCards[1] = false;
      this.exibeCards[2] = false;

      this.isAlunoCadastrado = true;
    } else if (this.validaCardAtual(numeroCardAtual)) {
      this.exibeCards[numeroCardAtual] = false;
      this.exibeCards[numeroCardNovo] = true;
    } else {
      this.setAlertAberto(true);
    }
  }
  validaCardAtual(cardAtual: number): boolean {
    switch (cardAtual) {
      case 0:
        if (
          this.form.get('nome')?.valid &&
          this.form.get('email')?.valid &&
          this.form.get('telefone')?.valid
        )
          return true;
        else return false;
      case 1:
        if (
          this.form.get('pesoEmKg')?.valid &&
          this.form.get('alturaEmM')?.valid &&
          this.form.get('graduacao')?.valid
        )
          return true;
        else return false;
      case 2:
        if (this.form.valid) return true;
        else return false;
    }

    return false;
  }

  onSubmit() {
    if (this.validaCardAtual(2)) {
      this.enviaDados(this.form.value);
      this.fechaCardAtualMostraProximoValidandoCardAtual(2, 3);
    } else this.setAlertAberto(true);
  }

  enviaDados(dados: object) {
    console.log(dados);
  }

  voltarParaLogin() {
    this.router.navigate(['/login']);
  }

  voltaFormAnterior() {
    if (this.exibeCards[0]) this.voltarParaLogin();
    else if (this.exibeCards[1]) {
      this.exibeCards[1] = false;
      this.exibeCards[0] = true;
    } else if (this.exibeCards[2]) {
      this.exibeCards[2] = false;
      this.exibeCards[1] = true;
    }
  }

  confirmPasswordValidator: ValidatorFn = (control: AbstractControl) => {
    const senha = control.get('senha')?.value;
    const confirmaSenha = control.get('confirmaSenha')?.value;
    return senha === confirmaSenha ? null : { passwordMismatch: true };
  };

  setAlertAberto(isAberto: boolean) {
    this.isAlertAberto = isAberto;
  }
}
