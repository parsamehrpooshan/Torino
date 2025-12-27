import Image from "next/image";
import Link from "next/link";
import styles from "./not-found.module.css"

function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h2>صفحه مورد نظر یافت نشد!</h2>
        <button>
          <Link href={"/"}>بازگشت به صفحه اصلی</Link>
        </button>
      </div>
      <Image src="/images/ErrorTV.png" alt="404" width={600} height={600}/>
    </div>
  );
}

export default NotFound;
