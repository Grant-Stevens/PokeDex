import Image from "next/image";
import styles from "./pokemon.module.scss";
import Spinner from "../spinner";
import { typeColors, usePokemonContext } from "@/context/pokemonContext";
import { FormEvent, useEffect, useRef, useState } from "react";

const Pokemon = () => {
  const { pokemon, isLoading, getPokemon } = usePokemonContext();
  const [showNumInput, setShowNumInput] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const numFormRef = useRef<HTMLFormElement | null>(null);
  const nameFormRef = useRef<HTMLFormElement | null>(null);
  const numInputRef = useRef<HTMLInputElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = useState<{ [x: string]: string | undefined }>({
    num: undefined,
    name: undefined,
  });

  function toggleNumInput() {
    setShowNumInput(!showNumInput);
    setErrors({ ...errors, num: undefined });
  }

  function toggleNameInput() {
    setShowNameInput(!showNameInput);
    setErrors({ ...errors, name: undefined });
  }

  function handleNumSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = Number(numInputRef?.current?.value);
    if (isNaN(input)) {
      setErrors({ ...errors, num: "Input is not a valid number" });
      return;
    }
    if (1 > input || input > 1205) {
      setErrors({ ...errors, num: "This pokemon doesn't exist" });
      return;
    }
    getPokemon(input);
    toggleNumInput();
  }

  function handleNameSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = nameInputRef?.current?.value;
    if (!input) {
      setErrors({ ...errors, name: "Please enter a name" });
      return;
    }
    getPokemon(input);
    toggleNameInput();
  }

  useEffect(() => {
    if (showNumInput) {
      numInputRef?.current?.focus();
    }
  }, [showNumInput]);

  useEffect(() => {
    if (showNameInput) {
      nameInputRef?.current?.focus();
    }
  }, [showNameInput]);

  return (
    <div className={styles.pokemon}>
      {isLoading ? (
        <Spinner />
      ) : !pokemon ? (
        <p>Pokemon not found</p>
      ) : (
        <>
          <form
            className={styles.form}
            ref={numFormRef}
            onSubmit={handleNumSubmit}
          >
            <p className={styles.id} onClick={toggleNumInput}>
              <span>#</span>
              {showNumInput ? (
                <input
                  ref={numInputRef}
                  className={[styles["num-input"], styles.input].join(" ")}
                  type="text"
                  onBlur={toggleNumInput}
                />
              ) : (
                <span>{pokemon.id}</span>
              )}
            </p>
            {errors["num"] && (
              <span className={styles.error}>{errors["num"]}</span>
            )}
          </form>
          <Image
            className={styles.image}
            src={pokemon.image}
            alt={pokemon.name}
            width={300}
            height={300}
          />
          {!showNameInput && (
            <span className={styles.name} onClick={toggleNameInput}>
              {pokemon.name}
            </span>
          )}
          {showNameInput && (
            <form
              className={styles.form}
              ref={nameFormRef}
              onSubmit={handleNameSubmit}
            >
              <input
                className={[styles["name-input"], styles.input].join(" ")}
                type="text"
                ref={nameInputRef}
                onBlur={toggleNameInput}
              />
              {errors["name"] && (
                <span className={styles.error}>{errors["name"]}</span>
              )}
            </form>
          )}
          <div className={styles.types}>
            {pokemon.types &&
              pokemon.types.map((type) => (
                <span
                  key={type}
                  className={styles.type}
                  style={{ color: typeColors[type] }}
                >
                  {type}
                </span>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Pokemon;
