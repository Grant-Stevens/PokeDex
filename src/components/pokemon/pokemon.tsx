import Image from "next/image";
import styles from "./pokemon.module.scss";
import Spinner from "../spinner";
import { typeColors, usePokemonContext } from "@/context/pokemonContext";
import { FormEvent, useEffect, useRef, useState } from "react";

const Pokemon = () => {
  const { pokemon, isLoading, setPokemonNum } = usePokemonContext();
  const [showInput, setShowInput] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const idInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<{ message: string } | undefined>(
    undefined
  );

  function toggleInput() {
    setShowInput(!showInput);
    setError(undefined);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = Number(idInputRef?.current?.value);
    console.log("invalid:", isNaN(input));
    if (isNaN(input)) {
      setError({ message: "Input is not a valid number" });
      return;
    }
    if (1 > input || input > 1205) {
      setError({ message: "This pokemon doesn't exist" });
      return;
    }
    console.log("input:", input);
    setPokemonNum(Number(input));
    toggleInput();
  }

  useEffect(() => {
    if (showInput) {
      idInputRef?.current?.focus();
    }
  }, [showInput]);

  return (
    <div className={styles.pokemon}>
      {isLoading ? (
        <Spinner />
      ) : !pokemon ? (
        <p>No pokemon data</p>
      ) : (
        <>
          {!showInput && (
            <span className={styles.id} onClick={toggleInput}>
              #{pokemon.id}
            </span>
          )}
          {showInput && (
            <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
              <span className={styles.id}>
                #
                <input
                  className={styles.input}
                  type="text"
                  ref={idInputRef}
                  onBlur={toggleInput}
                />
              </span>
              {error && <span className={styles.error}>{error.message}</span>}
            </form>
          )}
          <Image
            className={styles.image}
            src={pokemon.image}
            alt={pokemon.name}
            width={300}
            height={300}
          />
          <span className={styles.name}>{pokemon.name}</span>
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
