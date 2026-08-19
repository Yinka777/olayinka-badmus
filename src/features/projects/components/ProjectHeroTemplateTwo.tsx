import styles from "./ProjectHeroTemplateTwo.module.css";

type ProjectHeroTemplateTwoProps = {
  title: string;
  year: string;
};

export function ProjectHeroTemplateTwo({
  title,
  year,
}: ProjectHeroTemplateTwoProps) {
  return (
    <header className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.year}>{year}</p>
        </div>
      </div>
    </header>
  );
}