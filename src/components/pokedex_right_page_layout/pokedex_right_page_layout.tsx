import { ReactNode } from "react";
import styles from "./pokedex_right_page_layout.module.scss";
import AestheticShape from "../aesthetic_shape";

const RightPage = ({ ...props }): ReactNode => {
  const { children } = props;

  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <AestheticShape leftColour="var(--background)" rightColour="red" flip />
      </section>
      <section className={styles.content}>{children}</section>
    </div>
  );
};

export default RightPage;
