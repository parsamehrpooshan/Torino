"use client";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bankFormSchema } from "@/core/schema/index";
import { useUpdateBankAccount } from "@/core/services/mutations";
import toast from "react-hot-toast";
import { DatePicker } from "zaman";

function AccountForm({ setAccountForm, data }) {
  const { register, handleSubmit, control } = useForm();
  const { mutate, isPending } = useUpdateBankAccount();

  const submitHandler = (data) => {
    console.log(data);
    if (isPending) return;

    // دیتای خط پایین را ریکت هوک فرم به ما میدهدو onError  هم خودمان بنویسیم
    mutate(data, {
      onSuccess: (data) => {
        console.log(data);
        toast.success(data?.data?.message);
        setAccountForm(false);
      },
    });
  };

  return (
    <div className="border-gray">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="*:border-2 *:border-gray-300 *:rounded-md *:m-2 *:p-2"
      >
        <input
          {...register("mobile")}
          placeholder="شماره تماس"
          defaultValue={data?.data?.mobile}
        />
        <input
          {...register("email")}
          placeholder="ایمیل"
          defaultValue={data?.data?.email}
        />

        <input
          type="submit"
          value="تایید"
          className="!bg-green-500 text-white !border-0"
        />
        <button onClick={() => setAccountForm(false)}>انصراف</button>
      </form>
    </div>
  );
}

export default AccountForm;
