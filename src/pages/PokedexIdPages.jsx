import { useParams } from "react-router-dom";
import useFetch from "../hooks/UseFetch";
import { useEffect } from "react";

const PokedexIdPages = () => {
  const { id } = useParams();

  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const [pokemon, getPokemon] = useFetch(url);

  useEffect(() => {
    getPokemon();
  }, [id]);

  console.log(pokemon);

  return (
    <div>
      <header className="pokedexId__header">
       <img className="pokedexId__img1" src="/public/images/header.png" />
       <img className="pokedexId__img2" src="./public/images/pokedex.png" alt="" />
      </header>
      <div className="pokedexId__img__container">
      <img
        className="pokedexId__img"
        src={pokemon?.sprites.other["official-artwork"].front_default}
        alt=""
      />
      </div>
      <div className="pokedexId__body">
      <h3 className="pokedexId__id">#{pokemon?.id}</h3>
      <h2 className="pokedexId__name">{pokemon?.name}</h2>
      </div>
      <ul className="pokedexId__list">
        <li className="pokedexId__item">
          <span className="pokedexId__label">Weight</span>
          <span className="pokedexId__value">{pokemon?.weight}</span>
        </li>
        <li className="pokedexId__item">
          <span className="pokedexId__label">Height</span>
          <span className="pokedexId__value">{pokemon?.height}</span>
        </li>
      </ul>
      <div>
         <h3 className="pokedexId__typename">Type</h3>
         <ul className="pokedexId__type">
          {pokemon?.types.map((typeInfo) => (
            <li className="pokedexId__typeinfo" key={typeInfo.type.url}>{typeInfo.type.name}</li>
          ))}
         </ul>
        <h3 className="pokedexId__skillsname">Skills</h3>
        <ul className="pokedexId__skill">
          {pokemon?.abilities.map((skillInfo) => (
            <li className="pokedexId__skillsinfo" key={skillInfo.ability.url}>{skillInfo.ability.name}</li>
          ))}
        </ul>
          <h3 className="pokedexId__stats__name">Stats</h3>
        <ul className="pokedexId__stats">
          {pokemon?.stats.map((statInfo) => (
            <li className="pokedexId__statslist" key={statInfo.stat.url}>
              <span className="pokedexId__statslist__name">{statInfo.stat.name}</span>
            <div className="pokedexId__stats__bar">
              <div className="pokedexId__statslist__info" 
                   style={{ width: `${(statInfo.base_stat / 150) * 100}%`}}
              >
                  {statInfo.base_stat}/150
              </div>
            </div>
              
            </li>
          ))}
        </ul>
        <h3 className="pokedexId__moves__title">Movements</h3>
        <ul className="pokedexId__moves">
          {pokemon?.moves.map((moveInfo) => (
            <li className="pokedexId__moves__info" key={moveInfo.move.url}>{moveInfo.move.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokedexIdPages;
