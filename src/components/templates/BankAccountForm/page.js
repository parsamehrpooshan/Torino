"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bankFormSchema } from "@/core/schema/index";
import { useUpdateBankAccount } from "@/core/services/mutations";
import toast from "react-hot-toast";

function BankAccountForm({ setbankFormStatus, data }) {
  const { mutate, isPending } = useUpdateBankAccount();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(bankFormSchema) });

  const submitHandler = (data) => {
    if (isPending) return;

    // دیتای خط پایین را ریکت هوک فرم به ما میدهدو onError  هم خودمان بنویسیم
    mutate(
      { payment: data },
      {
        onSuccess: (data) => {
          console.log(data);
          toast.success(data?.data?.message);
          setbankFormStatus(false);
        },
      }
    );
  };

  return (
    <div className="border-gray">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="*:border-2 *:border-gray-300 *:rounded-md *:m-2 *:p-2"
      >
        <input
          {...register("shaba_code")}
          placeholder="شماره شبا"
          defaultValue={data?.data?.payment?.shaba_code}
        />
        {!!errors?.shaba_code && <span>{errors?.shaba_code?.message}</span>}
        <input
          {...register("debitCard_code")}
          placeholder="شماره کارت"
          defaultValue={data?.data?.payment?.debitCard_code}
        />
        {!!errors?.debitCard_code && (
          <span>{errors?.debitCard_code?.message}</span>
        )}
        <input
          {...register("accountIdentifier")}
          placeholder="شماره حساب"
          defaultValue={data?.data?.payment?.accountIdentifier}
        />
        {!!errors?.accountIdentifier && (
          <span>{errors?.accountIdentifier?.message}</span>
        )}

        <input
          type="submit"
          value="تایید"
          className="!bg-green-500 text-white !border-0"
        />
        <button onClick={() => setbankFormStatus(false)}>انصراف</button>
      </form>
    </div>
  );
}

export default BankAccountForm;
