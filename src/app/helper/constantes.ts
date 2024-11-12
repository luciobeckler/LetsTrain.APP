import { MaskitoOptions } from '@maskito/core';

//*Regex
export const REGEX_VALIDA_EMAIL: string =
  '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';
export const REGEX_VALIDA_NOME_COMPLETO: string =
  '^[A-Za-zÀ-ÖØ-öø-ÿ]+(\\s[A-Za-zÀ-ÖØ-öø-ÿ]+)+$';
export const REGEX_TELEFONE: string = '^319\\d{8}$';

//*Máscaras
export const PHONE_MASK: MaskitoOptions = {
  mask: [
    '+',
    '5',
    '5',
    ' ',
    '(',
    /\d/,
    /\d/,
    /\d/,
    ')',
    ' ',
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
