import { mixed, object, string } from "yup";
import {
  isValidCardNumber,
  isValidIranianNationalCode,
  isValidIranianSheba,
  isValidMobile,
  normalizeDigits,
} from "@/core/utils/validation";

const optionalEmail = string()
  .trim()
  .test(
    "email",
    "ایمیل معتبر وارد کنید",
    (value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  );

export const accountFormSchema = object({
  mobile: string()
    .required("شماره موبایل را وارد کنید")
    .test("iran-mobile", "شماره موبایل معتبر وارد کنید", (value) =>
      !value || isValidMobile(value)
    ),
  email: optionalEmail,
});

export const userProfileFormSchema = object({
  firstName: string()
    .trim()
    .required("نام را وارد کنید")
    .min(2, "نام باید حداقل ۲ حرف داشته باشد"),
  lastName: string()
    .trim()
    .required("نام خانوادگی را وارد کنید")
    .min(2, "نام خانوادگی باید حداقل ۲ حرف داشته باشد"),
  nationalCode: string()
    .required("کد ملی را وارد کنید")
    .test("national-code", "کد ملی معتبر نیست", (value) =>
      !value || isValidIranianNationalCode(value)
    ),
  gender: string()
    .required("جنسیت را انتخاب کنید")
    .oneOf(["female", "male"], "جنسیت انتخاب‌شده معتبر نیست"),
  birthDate: mixed()
    .required("تاریخ تولد را انتخاب کنید")
    .test("valid-date", "تاریخ تولد معتبر نیست", (value) => {
      if (!value) return false;
      const date = value instanceof Date ? value : new Date(value);
      return !Number.isNaN(date.getTime());
    }),
});

export const checkoutSchema = object({
  fullName: string()
    .trim()
    .required("نام و نام خانوادگی را وارد کنید")
    .test(
      "full-name",
      "نام و نام خانوادگی را کامل وارد کنید",
      (value) => Boolean(value && value.trim().split(/\s+/).filter(Boolean).length >= 2)
    ),
  nationalCode: string()
    .required("کد ملی را وارد کنید")
    .test("national-code", "کد ملی معتبر نیست", (value) =>
      !value || isValidIranianNationalCode(value)
    ),
  birthDate: mixed()
    .required("تاریخ تولد را انتخاب کنید")
    .test("valid-date", "تاریخ تولد معتبر نیست", (value) => {
      if (!value) return false;
      const date = value instanceof Date ? value : new Date(value);
      return !Number.isNaN(date.getTime());
    }),
  gender: string()
    .required("جنسیت را انتخاب کنید")
    .oneOf(["female", "male"], "جنسیت انتخاب‌شده معتبر نیست"),
});

export const bankFormSchema = object({
  shaba_code: string()
    .required("شماره شبا را وارد کنید")
    .test("iranian-iban", "شماره شبا معتبر نیست (IR به‌همراه ۲۴ رقم)", (value) =>
      !value || isValidIranianSheba(value)
    ),
  debitCard_code: string().test(
    "card-number",
    "شماره کارت باید ۱۶ رقم معتبر باشد",
    (value) => !value || isValidCardNumber(value)
  ),
  accountIdentifier: string()
    .required("شماره حساب را وارد کنید")
    .min(8, "شماره حساب باید حداقل ۸ کاراکتر باشد")
    .max(16, "شماره حساب نباید بیشتر از ۱۶ کاراکتر باشد"),
});

export const sendOtpSchema = object({
  mobile: string()
    .required("شماره موبایل را وارد کنید")
    .test("iran-mobile", "شماره موبایل معتبر وارد کنید", (value) =>
      !value || isValidMobile(value)
    ),
});

export const checkOtpSchema = object({
  code: string()
    .required("کد تایید را وارد کنید")
    .test(
      "six-digits",
      "کد تایید باید دقیقاً ۶ رقم باشد",
      (value) => /^\d{6}$/.test(normalizeDigits(value || ""))
    ),
});
