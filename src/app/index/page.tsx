import Link from "next/link";

import { homeProjects } from "@/features/home/data/homeProjects";

import styles from "./Index.module.css";

export default function IndexPage() {
  return (
    <main className={styles.page}>
      <div className={styles.index}>
        {homeProjects.map((category) => (
          <section
            key={category.title}
            className={styles.category}
          >
            <h1 className={styles.categoryTitle}>
              {category.title}
            </h1>

            <div className={styles.projects}>
              {category.subprojects.map(
                (project, index) => (
                  <Link
                    key={project.href}
                    href={project.href}
                    className={styles.project}
                  >
                    <span className={styles.number}>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className={styles.projectTitle}>
                      {project.title}
                    </span>
                  </Link>
                ),
              )}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}