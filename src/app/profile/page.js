"use client";

import BankAccountForm from "@/components/templates/BankAccountForm/page";
import UserProfileForm from "@/components/templates/UserProfileForm/page";
import AccountForm from "@/components/templates/AccountForm/page";
import { useGetUserData } from "@/core/services/queries";
import React, { useState } from "react";

import styles from "./profile.module.css";
import Image from "next/image";

import { convertToBirthdate } from "@/core/utils/helpers";


function ProfilePage() {
  const [accountForm, setAccountForm] = useState(false);

  const [bankFormStatus, setbankFormStatus] = useState(false);
  const [userProfileForm, setUserProfileForm] = useState(false);

  const { data } = useGetUserData();

  console.log(data?.data?.payment);

  return (
    <div className={styles.main}>
      {accountForm ? (
        <AccountForm setAccountForm={setAccountForm} data={data} />
      ) : (
        <div className={styles.personal}>
          <header>
            <h2>اطلاعات حساب کاربری</h2>
            <div>
              <Image
                src="/images/edit-2.png"
                alt="user-tick"
                width={200}
                height={200}
              />
              <button onClick={() => setAccountForm(true)}>
                ویرایش اطلاعات
              </button>
            </div>
          </header>
          <section>
            <p>شماره موبایل : {data?.data?.mobile || "--"}</p>
            <p>ایمیل : {data?.data?.email || "--"}</p>
          </section>
        </div>
      )}
      {userProfileForm ? (
        <UserProfileForm setUserProfileForm={setUserProfileForm} data={data} />
      ) : (
        <div className={styles.personal}>
          <header>
            <h2>اطلاعات شخصی</h2>
            <div>
              <Image
                src="/images/edit-2.png"
                alt="user-tick"
                width={200}
                height={200}
              />
              <button onClick={() => setUserProfileForm(true)}>
                ویرایش اطلاعات
              </button>
            </div>
          </header>
          <section>
            <p>
              نام و نام خانوادگی : {data?.data?.firstName || "--"}{" "}
              {data?.data?.lastName || "--"}
            </p>
            <p>کد ملی : {data?.data?.nationalCode || "--"}</p>
            <p>
              جنسیت :{" "}
              {data?.data?.gender === "male"
                ? "آقا"
                : data?.data?.gender === "male"
                ? "خانم"
                : "--"}
            </p>
            <p>تاریخ تولد : {convertToBirthdate(data?.data?.birthDate) || "--"}</p>
          </section>
        </div>
      )}
      {bankFormStatus ? (
        <BankAccountForm setbankFormStatus={setbankFormStatus} data={data}/>
      ) : (
        <div className={styles.personal}>
          <header>
            <h2>اطلاعات حساب بانکی</h2>
            <div>
              <Image
                src="/images/edit-2.png"
                alt="user-tick"
                width={200}
                height={200}
              />
              <button onClick={() => setbankFormStatus(true)}>
                ویرایش اطلاعات
              </button>
            </div>
          </header>
          <section>
            <p>شماره شبا : {data?.data?.payment?.shaba_code || "--"}</p>
            <p>شماره کارت : {data?.data?.payment?.debitCard_code || "--"}</p>
            <p>شماره حساب : {data?.data?.payment?.accountIdentifier || "--"}</p>
          </section>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
