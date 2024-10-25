import { usePokemonContext } from "@/context/pokemonContext";
import { IPokemon } from "../pokemon/pokemon";
import Spinner from "../spinner";

const PokemonDetails = () => {
  const { pokemon, isLoading } = usePokemonContext();

  if (isLoading) return <Spinner />;

  return (
    <>
      <span>Signature move: {pokemon?.moves[0].move.name}</span>
      <span>Typical height: {pokemon.height}</span>
    </>
  );
};

export default PokemonDetails;
