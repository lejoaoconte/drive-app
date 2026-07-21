const CPF_LENGTH = 11;
const FACTOR_FIRST_DIGIT = 10;
const FACTOR_SECOND_DIGIT = 11;

export function validateCpf(originalCpf: string) {
  if (!originalCpf) return false;
  const cpf = removeNonDigits(originalCpf);
  if (cpf.length !== CPF_LENGTH) return false;
  if (allDigitsTheSame(cpf)) return false;
  const digit1 = calculateDigit(cpf, FACTOR_FIRST_DIGIT);
  const digit2 = calculateDigit(cpf, FACTOR_SECOND_DIGIT);
  return extractDigit(cpf) == `${digit1}${digit2}`;
}

function removeNonDigits(text: string) {
  return text.replace(/\D/g, "");
}

function allDigitsTheSame(cpf: string) {
  const [firstDigit] = cpf;
  return cpf.split("").every((digit) => digit === firstDigit);
}

function calculateDigit(cpf: string, factor: number) {
  let total = 0;
  for (const digit of cpf) {
    if (factor > 1) total += parseInt(digit) * factor--;
  }
  const remainder = total % CPF_LENGTH;
  return remainder < 2 ? 0 : CPF_LENGTH - remainder;
}

function extractDigit(cpf: string) {
  return cpf.slice(9);
}
