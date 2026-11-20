"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bankFormSchema } from "@/core/schema";
import { useUpdateBankAccount } from "@/core/services/mutations";
import toast from "react-hot-toast";

function BankAccountForm({ setbankFormStatus, data }) {
  const { mutate, isPending } = useUpdateBankAccount();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bankFormSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      shaba_code: data?.data?.payment?.shaba_code || "",
      debitCard_code: data?.data?.payment?.debitCard_code || "",
      accountIdentifier: data?.data?.payment?.accountIdentifier || "",
    },
  });

  const submitHandler = (formData) => {
    if (isPending) return;

    // Keep the existing API payload shape unchanged.
    mutate(
      { payment: formData },
      {
        onSuccess: (response) => {
          toast.success(
            response?.data?.message || "اطلاعات بانکی با موفقیت به‌روزرسانی شد"
          );
          setbankFormStatus(false);
        },
        onError: () =>
          toast.error("به‌روزرسانی اطلاعات بانکی انجام نشد؛ دوباره تلاش کنید"),
      }
    );
  };

  const fieldError = (name) =>
    errors[name] ? (
      <span className="mx-2 text-sm text-red-600" role="alert">
        {errors[name].message}
      </span>
    ) : null;

  return (
    <div className="border-gray">
      <form
        onSubmit={handleSubmit(submitHandler)}
        noValidate
        className="*:border-2 *:border-gray-300 *:rounded-md *:m-2 *:p-2 w-full  max-w-[550px]"
      >
        <div>
          <input
            {...register("shaba_code")}
            placeholder="شماره شبا (IR...)"
            autoComplete="off"
            aria-invalid={!!errors.shaba_code}
          />
          {fieldError("shaba_code")}
        </div>
        <div>
          <input
            {...register("debitCard_code")}
            placeholder="شماره کارت"
            inputMode="numeric"
            maxLength={16}
            aria-invalid={!!errors.debitCard_code}
          />
          {fieldError("debitCard_code")}
        </div>
        <div>
          <input
            {...register("accountIdentifier")}
            placeholder="شماره حساب"
            aria-invalid={!!errors.accountIdentifier}
          />
          {fieldError("accountIdentifier")}
        </div>
        <input
          type="submit"
          value={isPending ? "در حال ذخیره..." : "تایید"}
          disabled={isPending}
          className="!bg-green-500 text-white !border-0 disabled:opacity-60"
        />
        <button type="button" onClick={() => setbankFormStatus(false)}>
          انصراف
        </button>
      </form>
    </div>
  );
}

export default BankAccountForm;
