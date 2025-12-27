"use client";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bankFormSchema } from "@/core/schema/index";
import { useUpdateBankAccount } from "@/core/services/mutations";
import toast from "react-hot-toast";
import { DatePicker } from "zaman";


function UserProfileForm({ setUserProfileForm, data }) {
  const { mutate, isPending } = useUpdateBankAccount();
  const { register, handleSubmit, control } = useForm();

  const submitHandler = (data) => {
    console.log(data);
    if (isPending) return;

    // دیتای خط پایین را ریکت هوک فرم به ما میدهدو onError  هم خودمان بنویسیم
    mutate(data, {
      onSuccess: (data) => {
        console.log(data);
        toast.success(data?.data?.message);
        setUserProfileForm(false);
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
          {...register("firstName")}
          placeholder="نام"
          defaultValue={data?.data?.firstName}
        />
        <input
          {...register("lastName")}
          placeholder="نام خانوادگی"
          defaultValue={data?.data?.lastName}
        />
        <input
          {...register("nationalCode")}
          placeholder="کد ملی"
          defaultValue={data?.data?.nationalCode}
        />
        <select {...register("gender")}>
          <option value="female">خانم</option>
          <option value="male">آقا</option>
        </select>
        <Controller
          control={control}
          name="birthDate"
          render={({ field: { onChange } }) => (
            <DatePicker onChange={(e) => onChange(e.value)} defaultValue={data?.data?.birthDate} />
          )}
        />
        <input
          type="submit"
          value="تایید"
          className="!bg-green-500 text-white !border-0"
        />
        <button onClick={() => setUserProfileForm(false)}>انصراف</button>
      </form>
    </div>
  );
}

export default UserProfileForm;
