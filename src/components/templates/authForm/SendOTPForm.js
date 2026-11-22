"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendOtpSchema } from "@/core/schema";
import { useSendOtp } from "@/core/services/mutations";
import toast from "react-hot-toast";

function SendOTPForm({ setStep, mobile, setMobile }) {
  const { isPending, mutate } = useSendOtp();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(sendOtpSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: { mobile: mobile || "" },
  });

  useEffect(() => {
    setValue("mobile", mobile || "");
  }, [mobile, setValue]);

  const mobileField = register("mobile");

  const submitHandler = (formData) => {
    if (isPending) return;

    mutate(
      { mobile: formData.mobile },
      {
        onSuccess: (response) => {
          toast.success(response?.data?.message || "کد تایید ارسال شد");
          if (response?.data?.code) toast(response.data.code);
          setStep(2);
        },
        onError: () =>
          toast.error("ارسال کد تایید انجام نشد؛ شماره را بررسی کنید"),
      }
    );
  };

  return (
    <div className="flex flex-col w-[min(561px,calc(100vw-2rem))] h-[362px] rounded-[20px] bg-white p-10 pt-16 max-sm:h-auto max-sm:max-h-[90svh] max-sm:overflow-y-auto max-sm:p-6 max-sm:pt-10">
      <h4 className="text-xl text-center font-bold">ورود به تورینو</h4>
      <form
        onSubmit={handleSubmit(submitHandler)}
        noValidate
        className="flex flex-col gap-5 flex-1 mt-6"
      >
        <label htmlFor="mobile">شماره موبایل خود را وارد کنید</label>
        <input
          {...mobileField}
          type="tel"
          id="mobile"
          inputMode="numeric"
          autoComplete="tel"
          maxLength={11}
          placeholder="۰۹۱۸۹۹۹****"
          className="h-11 p-2 rounded-md border border-black/25"
          onChange={(event) => {
            mobileField.onChange(event);
            setMobile(event.target.value);
          }}
          aria-invalid={!!errors.mobile}
        />
        {!!errors.mobile && (
          <p className="text-red-500 text-sm" role="alert">
            {errors.mobile.message}
          </p>
        )}
        <button
          disabled={isPending}
          className="bg-[#28A745] h-11 text-white rounded-md disabled:opacity-60"
          type="submit"
        >
          {isPending ? "...در حال ارسال پیامک کد تایید" : "ارسال کد تایید"}
        </button>
      </form>
    </div>
  );
}

export default SendOTPForm;
