"use client";

import { useState } from "react";

import ModalContainer from "@/components/partials/container/ModalContainer";
import SendOTPForm from "./SendOTPForm";
import CheckOTPForm from "./CheckOTPForm";
import { useGetUserData } from "@/core/services/queries";
import Link from "next/link";
import Image from "next/image";

import styles from "./index.module.css"

function AuthForm() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useGetUserData();
  const { data: userData } = data || {};

  if (userData)
    return (
      <Link href="/profile" className={styles.number}>
        <Image
            src="/images/greenprofile.png"
            alt="arrow-down"
            width={200}
            height={200}
          />
        <p>{userData?.mobile}</p>
        <div>
          <Image
            src="/images/arrow-down.png"
            alt="arrow-down"
            width={200}
            height={200}
          />
        </div>
      </Link>
    );

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>ورود | ثبت نام</button>
      {step === 1 && (
        <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen} setStep={setStep}>
          <SendOTPForm
            setStep={setStep}
            mobile={mobile}
            setMobile={setMobile}
          />
        </ModalContainer>
      )}
      {step === 2 && (
        <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen} setStep={setStep}>
          <CheckOTPForm
            setStep={setStep}
            mobile={mobile}
            setIsOpen={setIsOpen}
          />
        </ModalContainer>
      )}
    </div>
  );
}

export default AuthForm;
