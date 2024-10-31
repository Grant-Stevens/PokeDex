import {
  StatString,
  statStrings,
  usePokemonContext,
} from "@/context/pokemonContext";
import Spinner from "../spinner";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShieldIcon from "@mui/icons-material/Shield";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import FlareIcon from "@mui/icons-material/Flare";
import styles from "./pokemon_stats.module.scss";

function getIcon(stat: StatString) {
  if (!stat) return;
  switch (stat) {
    case "hp":
      return <FavoriteIcon />;
    case "attack":
      return <MyLocationIcon />;
    case "defense":
      return <ShieldIcon />;
    case "special-attack":
      return <FlareIcon />;
    case "special-defense":
      return <LocalPoliceIcon />;
    case "speed":
      return <FlashOnIcon />;
    default:
      return;
  }
}

const PokemonStats = () => {
  const { pokemon, isLoading } = usePokemonContext();

  if (isLoading) return <Spinner />;
  if (!pokemon) return <p>No Pokemon data.</p>;
  return (
    <div className={styles.stats}>
      <div className={styles["bar-chart"]}>
        {pokemon &&
          pokemon.stats &&
          pokemon.stats.map((stat) => {
            return (
              <div className={styles.stat} key={stat.name}>
                <span className={styles.title}>
                  {statStrings[stat.name as StatString]}
                </span>
                <div
                  className={[styles.bar, styles[stat.name]].join(" ")}
                  style={{ width: `${(stat.baseValue / 200) * 100}%` }}
                >
                  <span className={styles.value}>{stat.baseValue}</span>
                </div>
                {getIcon(stat.name)}
              </div>
            );
          })}
      </div>
      <div className={styles.physical}>
        <span>{pokemon.height}&quot;</span>
        <span>{pokemon.height}lb</span>
      </div>
      <span>
        <strong>Abilities:</strong>{" "}
        {pokemon.abilities.map((ability, index) => {
          if (index === pokemon.abilities.length - 1) return ability.name;
          return `${ability.name}, `;
        })}
      </span>
    </div>
  );
};

export default PokemonStats;
