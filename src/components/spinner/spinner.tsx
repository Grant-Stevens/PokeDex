import Image from "next/image";
import styles from "./spinner.module.scss";

const Spinner = () => {
  return (
    <div className={styles.container}>
      <Image
        className={styles.spinner}
        src="/loader.png"
        height={50}
        width={50}
        alt="loading"
      />
    </div>
  );
};

export default Spinner;
