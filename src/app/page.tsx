"use client";

import LeftPage from "../components/pokedex_left_page_layout";
import RightPage from "../components/pokedex_right_page_layout";
import Image from "next/image";
import Hinge from "../components/hinge";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import Pokemon, { IPokemon } from "@/components/pokemon/pokemon";

export default function Home() {
  const [pokemonSelector, setPokemonSelector] = useState<number>(1);

  function handleNav(offset: number) {
    const newSelector = pokemonSelector + offset;

    if (newSelector > 0 && newSelector < 1302) setPokemonSelector(newSelector);
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <LeftPage>
          <div className={styles.screen}>
            <Pokemon pokemonSelector={pokemonSelector} />
          </div>
          <div className={styles["nav-buttons"]}>
            <Image
              className={pokemonSelector === 1 ? styles.disabled : undefined}
              src="/arrow_backward.png"
              alt={"back"}
              height={50}
              width={50}
              onClick={() => handleNav(-1)}
            />
            <Image
              src="/arrow_forward.png"
              alt={"back"}
              height={50}
              width={50}
              onClick={() => handleNav(1)}
            />
          </div>
        </LeftPage>
        <Hinge />
        <RightPage />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
