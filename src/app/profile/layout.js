import AuthProvider from "@/components/partials/provider/AuthProvider";
import Link from "next/link";

import styles from "./profile.module.css";
import Image from "next/image";

function ProfileLayout({ children }) {
  return (
    <AuthProvider>
      <div className={styles.layout}>
        <ul className={styles.sidebar}>
          <li>
            <Image
              src="/images/profile.png"
              alt="user-tick"
              width={200}
              height={200}
            />
            <Link href={"/profile"}>پروفایل من</Link>
          </li>
          <li>
            <Image
              src="/images/sun-fog.png"
              alt="user-tick"
              width={200}
              height={200}
            />
            <Link href={"/profile/my-tours"}>تور های من</Link>
          </li>
          <li>
            <Image
              src="/images/convert-card.png"
              alt="user-tick"
              width={200}
              height={200}
            />
            <Link href={"/profile/transactions"}>تراکنش ها</Link>
          </li>
        </ul>
        <main className="col-span-3">{children}</main>
      </div>
    </AuthProvider>
  );
}

export default ProfileLayout;
