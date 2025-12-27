import { object, string } from "yup";

export const bankFormSchema = object({
  shaba_code: string().required("شماره شبا را وارد کنید"),
  debitCard_code: string().length(16, "شماره کارت باید 16 رقم باشد"),
  accountIdentifier: string()
    .min(8, "باید حداقل 8 کاراکتر باشد")
    .max(16)
    .required(),
});
