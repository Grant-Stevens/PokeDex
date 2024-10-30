import { ReactNode } from "react";
import styles from "./pokedex_left_page_layout.module.scss";
import AestheticShape from "../aesthetic_shape/aesthetic_shape";

const LeftPage = ({ ...props }): ReactNode => {
  const { children } = props;

  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <div className={styles.light} />
        <div className={styles.indicators}>
          <span className={styles.red} />
          <span className={styles.yellow} />
          <span className={styles.green} />
        </div>
        <AestheticShape />
        {/* <AestheticShape
          leftColour={"black"}
          rightColour={"transparent"}
          offset={"-2px"}
        /> */}
      </section>
      <section className={styles.content}>{children}</section>
    </div>
  );
};

export default LeftPage;
