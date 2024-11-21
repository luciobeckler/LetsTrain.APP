import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MaskitoDirective } from '@maskito/angular';
import { MaskitoElementPredicate, MaskitoOptions } from '@maskito/core';
import { AuthService } from 'src/app/api/auth.service';
import {
  REGEX_SENHA,
  REGEX_TELEFONE,
  REGEX_VALIDA_NOME_COMPLETO,
} from 'src/app/helper/constantes';
import { Aluno } from 'src/app/interface/aluno.interface';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
  standalone: true,
  imports: [
    MaskitoDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
})
export class SignInPage {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: AuthService
  ) {
    this.exibeCards = [true, false, false];

    this.form = this.formBuilder.group(
      {
        Nome: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(REGEX_VALIDA_NOME_COMPLETO),
          ])
        ),
        Email: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.email])
        ),
        Telefone: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(REGEX_TELEFONE),
          ])
        ),
        PesoEmKg: new FormControl(70, Validators.required),
        AlturaEmM: new FormControl(1.75, Validators.required),
        Graduacao: new FormControl(0, Validators.required),
        DiaVencimentoMatricula: new FormControl(
          1,
          Validators.compose([
            Validators.required,
            Validators.min(1),
            Validators.max(31),
          ])
        ),
        Password: new FormControl('', [
          Validators.required,
          Validators.pattern(REGEX_SENHA),
        ]),
        ConfirmaPassword: new FormControl('', Validators.required),
        Termos: new FormControl(false, Validators.requiredTrue),
      },
      { validators: this.confirmPasswordValidator }
    );
  }

  form: FormGroup;
  exibeCards: boolean[] = [true, false, false];
  isAlunoCadastrado = false;
  isAlertAberto = false;
  alertButtons = ['Ok'];

  readonly phoneMask: MaskitoOptions = {
    mask: [
      '+',
      '5',
      '5',
      ' ',
      '(',
      /\d/,
      /\d/,
      ')',
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ],
  };
  readonly maskPredicate: MaskitoElementPredicate = async (el) =>
    (el as HTMLIonInputElement).getInputElement();

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
          this.form.get('Nome')?.valid &&
          this.form.get('Email')?.valid &&
          this.form.get('Telefone')?.valid
        )
          return true;
        else return false;
      case 1:
        if (
          this.form.get('PesoEmKg')?.valid &&
          this.form.get('AlturaEmM')?.valid &&
          this.form.get('Graduacao')?.valid
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
    if (this.validaCardAtual(2) && this.form.valid) {
      this.enviaDados(this.form.value);
      this.fechaCardAtualMostraProximoValidandoCardAtual(2, 3);
    } else this.setAlertAberto(true);
  }

  enviaDados(dados: Aluno) {
    console.log(dados);
    this.service.createUser(dados).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
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
    const senha = control.get('Password')?.value;
    const confirmaSenha = control.get('ConfirmaPassword')?.value;
    return senha === confirmaSenha ? null : { passwordMismatch: true };
  };

  setAlertAberto(isAberto: boolean) {
    this.isAlertAberto = isAberto;
  }
}
