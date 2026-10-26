import styles from "./HomeIdentity.module.css";

export function HomeIdentity() {
  return (
    <aside className={styles.identity}>
      <a href="/about">
        <h1 className={styles.name}>
          Yinka Badmus
        </h1>
      </a>

      <p className={styles.role}>
        Designer / Creative Director
      </p>

      <p className={styles.location}>
        Toronto
      </p>
    </aside>
  );
}