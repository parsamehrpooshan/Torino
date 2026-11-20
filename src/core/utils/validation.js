const toEnglishDigits = (value = "") =>
  String(value).replace(/[۰-۹٠-٩]/g, (digit) =>
    String("۰۱۲۳۴۵۶۷۸۹٠١٢٣٤٥٦٧٨٩".indexOf(digit) % 10)
  );

export const normalizeDigits = toEnglishDigits;

export const isValidMobile = (mobile) =>
  /^09\d{9}$/.test(toEnglishDigits(mobile).replace(/\s+/g, ""));

export const isValidIranianNationalCode = (value) => {
  const code = toEnglishDigits(value).replace(/\s+/g, "");
  if (!/^\d{10}$/.test(code) || /^(\d)\1{9}$/.test(code)) return false;

  const check = Number(code[9]);
  const sum = code
    .slice(0, 9)
    .split("")
    .reduce((total, digit, index) => total + Number(digit) * (10 - index), 0);
  const remainder = sum % 11;

  return remainder < 2 ? check === remainder : check === 11 - remainder;
};

export const isValidCardNumber = (value) => {
  const card = toEnglishDigits(value).replace(/[\s-]/g, "");
  if (!/^\d{16}$/.test(card)) return false;

  let sum = 0;
  for (let index = 0; index < card.length; index += 1) {
    let digit = Number(card[card.length - 1 - index]);
    if (index % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
};

export const isValidIranianSheba = (value) => {
  const iban = toEnglishDigits(value)
    .replace(/\s+/g, "")
    .toUpperCase();

  if (!/^IR\d{24}$/.test(iban)) return false;

  const rearranged = `${iban.slice(4)}${iban.slice(0, 4)}`;
  const numeric = [...rearranged]
    .map((char) => (/[A-Z]/.test(char) ? char.charCodeAt(0) - 55 : char))
    .join("");

  let remainder = 0;
  for (const digit of numeric) {
    remainder = (remainder * 10 + Number(digit)) % 97;
  }
  return remainder === 1;
};
