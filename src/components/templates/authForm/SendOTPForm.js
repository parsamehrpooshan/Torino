"use client";

import { useState } from "react";

import { useSendOtp } from "@/core/services/mutations";
import { isValidMobile } from "@/core/utils/validation";
import toast from "react-hot-toast";

function SendOTPForm({ setStep, mobile, setMobile }) {
  const [error, setError] = useState("");

  const { isPending, mutate } = useSendOtp();

  const submitHandler = (event) => {
    event.preventDefault();

    if (isPending) return;

    if (!isValidMobile(mobile)) return setError("شماره معتبر وارد کنید");
    setError("");

    mutate(
      { mobile },
      {
        onSuccess: (data) => {
          toast.success(data?.data?.message);
          toast(data?.data?.code);
          setStep(2);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  return (
    <div className="flex flex-col w-[561px] h-[362px] rounded-[20px] bg-white p-10 pt-16">
      <h4 className="text-xl text-center font-bold">ورود به تورینو</h4>
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-5 flex-1 mt-6"
      >
        <label htmlFor="mobile">شماره موبایل خود را وارد کنید</label>
        <input
          type="text"
          id="mobile"
          placeholder="۰۹۱۸۹۹۹****"
          className="h-11 rounded-md border border-black/25"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        {!!error && <p className="text-red-500 h-2">{error}</p>}
        <button
          disabled={isPending}
          className="bg-[#28A745] h-11 text-white rounded-md"
          type="submit"
        >
          {isPending ? "...در حال ارسال پیامک کد تایید" : "ارسال کد تایید"}
        </button>
      </form>
    </div>
  );
}

export default SendOTPForm;
