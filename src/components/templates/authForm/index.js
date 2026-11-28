"use client";

import { useState } from "react";

import ModalContainer from "@/components/partials/container/ModalContainer";
import SendOTPForm from "./SendOTPForm";
import CheckOTPForm from "./CheckOTPForm";
import LogoutButton from "@/components/atoms/LogoutButton";
import { useGetUserData } from "@/core/services/queries";
import Link from "next/link";
import Image from "next/image";

import styles from "./index.module.css";

function AuthForm() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data } = useGetUserData();
  const { data: userData } = data || {};

  if (userData)
    return (
      <div
        className={styles.userMenu}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsMenuOpen(false);
          }
        }}
      >
        <button
          type="button"
          className={styles.userButton}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-haspopup="menu"
          aria-expanded={isMenuOpen}
        >
          <Image
            src="/images/greenprofile.png"
            alt="پروفایل"
            width={200}
            height={200}
            className={styles.triggerIcon}
          />

          <span className={styles.mobile}>{userData?.mobile}</span>

          <Image
            src="/images/arrow-down.png"
            alt=""
            width={200}
            height={200}
            className={`${styles.chevron} ${
              isMenuOpen ? styles.chevronOpen : ""
            }`}
          />
        </button>

        {isMenuOpen && (
          <div className={styles.dropdown} role="menu">
            <div className={styles.dropdownHeader}>
              <span className={styles.avatar}>
                <Image
                  src="/images/profile.png"
                  alt=""
                  width={200}
                  height={200}
                />
              </span>

              <span className={styles.headerMobile}>{userData?.mobile}</span>
            </div>

            <Link
              href="/profile"
              className={styles.menuItem}
              role="menuitem"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                className={styles.menuIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4.5 20c0-3.6 3.4-6 7.5-6s7.5 2.4 7.5 6" />
              </svg>
              <span>اطلاعات حساب کاربری</span>
            </Link>

            <LogoutButton />
          </div>
        )}
      </div>
    );

  return (
    <div className={styles.authForm}>
      <button
        type="button"
        className={styles.loginButton}
        onClick={() => setIsOpen(true)}
      >
        <Image
          src="/images/greenprofile.png"
          alt=""
          width={200}
          height={200}
          className={styles.loginIcon}
        />

        <span>ورود</span>
        <span className={styles.separator} aria-hidden="true" />
        <span>ثبت نام</span>
      </button>

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
