"use client";

import { useCheckout, useUpdateBankAccount } from "@/core/services/mutations";
import { useGetUserBasket, useGetUserData } from "@/core/services/queries";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";

import styles from "./checkout.module.css";
import Link from "next/link";
import Image from "next/image";

import { DatePicker } from "zaman";

import { getTourDurationLabel } from "@/core/utils/helpers";

function CheckoutPage() {
  const { data, error } = useGetUserBasket();

  console.log(data);

  const { mutate } = useCheckout();
  const { mutate: updateUserProfile } = useUpdateBankAccount();

  const router = useRouter();

  const { register, handleSubmit, reset, control } = useForm();

  const checkoutHandler = (formData) => {
    console.log("formdata");
    // if () {} کاربر اطلاعات را وارد کرده باشد
    mutate(formData, {
      onSuccess: (data) => {
        console.log(data);
        // location.href = link
        router.push("/payment?status=success");
      },
      onError: (error) => {
        console.log(error);
      },
    });

    updateUserProfile(formData);
  };

  console.log(error);
  if (!data?.data?.title)
    return (
      <div className="border border-green-500 bg-green-50 m-auto mt-20 w-fit rounded-md p-10">
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
        <form className="*:border-2 *:border-gray-300 *:rounded-md *:m-2 *:p-2">
          <input
            {...register("fullName", {
              required: "نام و نام خانوادگی را باید وارد کنید",
            })}
            placeholder="نام و نام خانوادگی"
          />

          <input
            {...register("nationalCode", { required: "true" })}
            placeholder="کد ملی"
          />
          <Controller
            control={control}
            name="birthDate"
            render={({ field: { onChange } }) => (
              <DatePicker
                inputAttributes={{ placeholder: "تاریخ تولد" }}
                onChange={(e) => onChange(e.value)}
              />
            )}
          />
          <select {...register("gender", { required: "true" })}>
            <option value="">جنسیت</option>
            <option value="female">خانم</option>
            <option value="male">آقا</option>
          </select>
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
        <button onClick={handleSubmit(checkoutHandler)}>
          ثبت و خرید نهایی
        </button>
      </div>
    </div>
  );
}
export default CheckoutPage;
