"use client";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import OtpInput from "react18-input-otp";
import { checkOtpSchema } from "@/core/schema";
import { useCheckOtp } from "@/core/services/mutations";
import toast from "react-hot-toast";

function CheckOTPForm({ mobile, setStep, setIsOpen }) {
  const { isPending, mutate } = useCheckOtp();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(checkOtpSchema),
    mode: "onChange",
    defaultValues: { code: "" },
  });

  const submitHandler = ({ code }) => {
    if (isPending) return;

    mutate(
      { mobile, code },
      {
        onSuccess: () => {
          setStep(1);
          setIsOpen(false);
          toast.success("ورود به حساب کاربری");
        },
        onError: () => toast.error("کد تایید معتبر نیست یا منقضی شده است"),
      }
    );
  };

  return (
    <div className="flex flex-col w-[min(561px,calc(100vw-2rem))] h-[362px] rounded-[20px] bg-white p-10 pt-16 max-sm:h-auto max-sm:max-h-[90svh] max-sm:overflow-y-auto max-sm:p-6 max-sm:pt-10">
      <h4 className="text-xl text-center font-bold">کد تایید را وارد کنید.</h4>
      <form
        onSubmit={handleSubmit(submitHandler)}
        noValidate
        className="flex flex-col gap-5 flex-1 mt-6"
      >
        <label className="text-xl text-center">کد تایید به شماره {mobile} ارسال شد</label>
        <div style={{ direction: "ltr" }}>
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <OtpInput
                value={field.value}
                onChange={field.onChange}
                numInputs={6}
                inputType="tel"
                shouldAutoFocus
                inputStyle="border border-gray-200 rounded-md !w-[38px] sm:!w-[48px] lg:!w-[58px] h-[53px] m-1 sm:m-2"
              />
            )}
          />
        </div>
        {!!errors.code && (
          <p className="text-red-500 text-sm text-center" role="alert">{errors.code.message}</p>
        )}
        <button
          disabled={isPending}
          className="bg-[#28A745] h-11 text-white rounded-md disabled:opacity-60"
          type="submit"
        >
          {isPending ? "...در حال اعتبارسنجی" : "ورود به تورینو"}
        </button>
      </form>
    </div>
  );
}

export default CheckOTPForm;
