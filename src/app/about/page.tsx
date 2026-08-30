import { AboutSnakeGame } from "@/features/about/components/AboutSnakeGame";

import styles from "./About.module.css";

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <AboutSnakeGame />

      <div className={styles.content}>
        <section className={styles.about}>
          <p>
            Yinka Badmus is a designer and creative practitioner 
            working across digital, physical, and cultural spaces. 
            His practice is rooted in curiosity, research, and experimentation,
            exploring how objects, images, systems, and environments shape the
            way we experience and understand the world. Moving between design, 
            technology, publishing, and art direction, his work seeks to create thoughtful,
            functional, and culturally resonant experiences.
          </p>
        </section>

        <section
          className={styles.enquiries}
        >
          <p>
            For projects,
            collaborations, commissions
            and other enquiries:
          </p>

          <a href="mailto:contact@olayinka-badmus.com">
            contact@olayinka-badmus.com
          </a>
          <br></br>
          <a href="https://www.instagram.com/yinkaexvi/">
            Instagram: @yinkaexvi
          </a>
        </section>
      </div>
    </main>
  );
}