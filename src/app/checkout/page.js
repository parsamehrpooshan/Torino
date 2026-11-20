"use client";

import { useCheckout, useUpdateBankAccount } from "@/core/services/mutations";
import { useGetUserBasket } from "@/core/services/queries";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutSchema } from "@/core/schema";

import styles from "./checkout.module.css";
import Link from "next/link";
import Image from "next/image";

import { DatePicker } from "zaman";

import { getTourDurationLabel } from "@/core/utils/helpers";

function CheckoutPage() {
  const { data } = useGetUserBasket();

  const { mutate } = useCheckout();
  const { mutate: updateUserProfile } = useUpdateBankAccount();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(checkoutSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      fullName: "",
      nationalCode: "",
      birthDate: "",
      gender: "",
    },
  });

  const fieldError = (name) =>
    errors[name] ? (
      <span
        id={`checkout-${name}-error`}
        className={styles.fieldError}
        role="alert"
      >
        {errors[name].message}
      </span>
    ) : null;

  // const checkoutHandler = (formData) => {
  //   // if () {} کاربر اطلاعات را وارد کرده باشد
  //   mutate(formData, {
  //     onSuccess: () => {
  //       // location.href = link
  //       router.push("/payment?status=success");
  //     },
  //     onError: (error) => {
  //       console.error(error);
  //     },
  //   });

  //   updateUserProfile(formData);
  // };

  const checkoutHandler = (formData) => {
    const nameParts = formData.fullName.trim().split(/\s+/);

    const profileData = {
      firstName: nameParts.shift() || "",
      lastName: nameParts.join(" "),
      nationalCode: formData.nationalCode,
      birthDate: formData.birthDate,
      gender: formData.gender,
    };

    mutate(formData, {
      onSuccess: () => {
        router.push("/payment?status=success");
      },
      onError: (error) => {
        console.error(error);
      },
    });

    updateUserProfile(profileData);
  };

  if (!data?.data?.title)
    return (
      <div className={styles.emptyState}>
        <p>سبد خرید شما خالی است</p>
        <Link href={"/"}>برو صفحه اصلی</Link>
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.right}>
        <div>
          <Image
            src="/images/profile.png"
            alt="user-tick"
            width={200}
            height={200}
          />
          <h2>مشخصات مسافر</h2>
        </div>
        <form
          id="checkout-form"
          className={styles.passengerForm}
          onSubmit={handleSubmit(checkoutHandler)}
          noValidate
        >
          <div className={styles.fieldGroup}>
            <input
              {...register("fullName")}
              placeholder="نام و نام خانوادگی"
              aria-invalid={!!errors.fullName}
              aria-describedby={
                errors.fullName ? "checkout-fullName-error" : undefined
              }
            />
            {fieldError("fullName")}
          </div>

          <div className={styles.fieldGroup}>
            <input
              {...register("nationalCode")}
              placeholder="کد ملی"
              inputMode="numeric"
              maxLength={10}
              aria-invalid={!!errors.nationalCode}
              aria-describedby={
                errors.nationalCode ? "checkout-nationalCode-error" : undefined
              }
            />
            {fieldError("nationalCode")}
          </div>

          <div className={styles.fieldGroup}>
            <Controller
              control={control}
              name="birthDate"
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  inputAttributes={{ placeholder: "تاریخ تولد" }}
                  onChange={(dateValue) => onChange(dateValue?.value ?? "")}
                  // defaultValue={value}
                />
              )}
            />
            {fieldError("birthDate")}
          </div>

          <div className={styles.fieldGroup}>
            <select
              {...register("gender")}
              aria-invalid={!!errors.gender}
              aria-describedby={
                errors.gender ? "checkout-gender-error" : undefined
              }
            >
              <option value="">جنسیت</option>
              <option value="female">خانم</option>
              <option value="male">آقا</option>
            </select>
            {fieldError("gender")}
          </div>
        </form>
      </div>
      <div className={styles.left}>
        <div>
          <h2>{data?.data?.title}</h2>
          {getTourDurationLabel(data?.data?.startDate, data?.data?.endDate)}
        </div>
        <h4>-----------------------------</h4>
        <div>
          <p>قیمت نهایی</p>
          <p>
            {data?.data?.price} <span>تومان</span>
          </p>
        </div>
        <button type="submit" form="checkout-form">
          ثبت و خرید نهایی
        </button>
      </div>
    </div>
  );
}
export default CheckoutPage;
