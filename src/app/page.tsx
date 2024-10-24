import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles["pokedex--page"]}></div>
        <div className={styles["pokedex--page"]}></div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
