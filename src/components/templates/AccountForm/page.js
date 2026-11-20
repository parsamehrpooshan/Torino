"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { accountFormSchema } from "@/core/schema";
import { useUpdateBankAccount } from "@/core/services/mutations";
import toast from "react-hot-toast";

function AccountForm({ setAccountForm, data }) {
  const { mutate, isPending } = useUpdateBankAccount();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(accountFormSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      mobile: data?.data?.mobile || "",
      email: data?.data?.email || "",
    },
  });

  const submitHandler = (formData) => {
    if (isPending) return;

    mutate(formData, {
      onSuccess: (response) => {
        toast.success(
          response?.data?.message || "اطلاعات حساب با موفقیت به‌روزرسانی شد"
        );
        setAccountForm(false);
      },
      onError: () =>
        toast.error("به‌روزرسانی اطلاعات حساب انجام نشد؛ دوباره تلاش کنید"),
    });
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
            {...register("mobile")}
            // type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="شماره تماس"
            aria-invalid={!!errors.mobile}
          />
          {fieldError("mobile")}
        </div>
        <div>
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            placeholder="ایمیل"
            aria-invalid={!!errors.email}
          />
          {fieldError("email")}
        </div>
        <input
          type="submit"
          value={isPending ? "در حال ذخیره..." : "تایید"}
          disabled={isPending}
          className="!bg-green-500 text-white !border-0 disabled:opacity-60"
        />
        <button type="button" onClick={() => setAccountForm(false)}>
          انصراف
        </button>
      </form>
    </div>
  );
}

export default AccountForm;
