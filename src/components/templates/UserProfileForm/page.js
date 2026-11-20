"use client";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userProfileFormSchema } from "@/core/schema";
import { useUpdateBankAccount } from "@/core/services/mutations";
import toast from "react-hot-toast";
import { DatePicker } from "zaman";

function UserProfileForm({ setUserProfileForm, data }) {
  const { mutate, isPending } = useUpdateBankAccount();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userProfileFormSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: data?.data?.firstName || "",
      lastName: data?.data?.lastName || "",
      nationalCode: data?.data?.nationalCode || "",
      gender: data?.data?.gender || "female",
      birthDate: data?.data?.birthDate || "",
    },
  });

  const submitHandler = (formData) => {
    if (isPending) return;

    mutate(formData, {
      onSuccess: (response) => {
        toast.success(
          response?.data?.message || "اطلاعات کاربری با موفقیت به‌روزرسانی شد"
        );
        setUserProfileForm(false);
      },
      onError: () =>
        toast.error("به‌روزرسانی اطلاعات کاربری انجام نشد؛ دوباره تلاش کنید"),
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
            {...register("firstName")}
            placeholder="نام"
            aria-invalid={!!errors.firstName}
          />
          {fieldError("firstName")}
        </div>
        <div>
          <input
            {...register("lastName")}
            placeholder="نام خانوادگی"
            aria-invalid={!!errors.lastName}
          />
          {fieldError("lastName")}
        </div>
        <div>
          <input
            {...register("nationalCode")}
            placeholder="کد ملی"
            inputMode="numeric"
            maxLength={10}
            aria-invalid={!!errors.nationalCode}
          />
          {fieldError("nationalCode")}
        </div>
        <div>
          <select {...register("gender")} aria-invalid={!!errors.gender}>
            <option value="female">خانم</option>
            <option value="male">آقا</option>
          </select>
          {fieldError("gender")}
        </div>
        <div>
          <Controller
            control={control}
            name="birthDate"
            render={({ field: { onChange, value } }) => (
              <DatePicker
                onChange={(dateValue) => onChange(dateValue?.value ?? "")}
                defaultValue={value}
              />
            )}
          />
          {fieldError("birthDate")}
        </div>
        <input
          type="submit"
          value={isPending ? "در حال ذخیره..." : "تایید"}
          disabled={isPending}
          className="!bg-green-500 text-white !border-0 disabled:opacity-60"
        />
        <button type="button" onClick={() => setUserProfileForm(false)}>
          انصراف
        </button>
      </form>
    </div>
  );
}

export default UserProfileForm;
