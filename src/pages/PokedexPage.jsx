import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import PokeCard from "../components/PokedexPage/PokeCard"
import SelectType from "../components/PokedexPage/SelectType"
import Pagination from "../components/PokedexPage/Pagination"
import useFetch from "../hooks/UseFetch"


const PokedexPage = () => {

  const [inputValue, setInputValue] = useState('')
  const [typeSelected, setTypeSelected] = useState('allPokemons')
  const [currentPage, setCurrentPage] = useState(1)
  const [cardsPerPage, setCardsPerPage] = useState(10)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const trainer = useSelector(store => store.trainer)

  const inputSearch = useRef()

  const url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'
  const [ pokemons, getPokemons, getTypePokemon] = useFetch(url)

  useEffect(() => {
    if (typeSelected === 'allPokemons') {
      getPokemons()
    } else {
      getTypePokemon(typeSelected) 
    }
  }, [typeSelected])

  const handleSearch = e => {
     e.preventDefault()
     setInputValue(inputSearch.current.value.trim().toLowerCase())
  }

  const pokeFiltered = pokemons?.results.filter(poke => poke.name.includes(inputValue))
  
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = pokeFiltered?.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => {
    if (cardsPerPage > 0 ) {
      setCurrentPage(pageNumber)
      setHasError(false)
    } else {
      setHasError(true)
    }   
  }

  const handleCardsPerPageChange = (e) => {
    const newCardsPerPage = parseInt(e.target.value, 10)
    setIsLoading(true)
    if (!isNaN(newCardsPerPage) && newCardsPerPage > 0) {
      setCardsPerPage(newCardsPerPage)
      setCurrentPage(1)
      setHasError(false)
    }else{
      setCardsPerPage(newCardsPerPage)
      setCurrentPage(1)
      setHasError(true)
    }
    setIsLoading(false)
  }


  return (
    <>
    <div>
    <header className="pokedex__header">
     <img className="pokedex__img" src="/images/header.png" />
     <img className="pokedex__img2" src="/images/pokedex.png" alt="" />
    </header>
    <div className="pokedex__body">
      <p className="pokedex__title">Hi {trainer}</p>
      <form className="pokedex__form" onSubmit={handleSearch}>
        <input className="pokedex__input" ref={inputSearch} type="text" />
        <button className="pokedex__button">Search</button>
      </form>
      <SelectType className="pokedex__filter" setTypeSelected={setTypeSelected} />
      {isLoading && <p className="pokedex__loading">Loading...</p>}
      <div className="pokecard__container">
        {currentCards?.map((poke) => (
          <PokeCard key={poke.url} url={poke.url} />
        ))}
      </div>
      <div className="pokedex__cardsPage">
        <label className="pokedex__label" htmlFor="cardsPerPage">Cards per Page</label>
        <input className="pokedex__cards__input"
          type="number"
          id="cardsPerPage"
          value={cardsPerPage}
          onChange={handleCardsPerPageChange}
        />
      </div>
      <div>
        {pokeFiltered && pokeFiltered.length > 0 && cardsPerPage > 0 ? (
          <Pagination
            cardsPerPage={cardsPerPage}
            totalCards={pokeFiltered.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        ) : (
          <p className="pokedex__error">
           {hasError
             ? "The number of cards per page must be a valid value greater than 0"
             : "No items to display"
           }
          </p>
        )
        }
      </div>
    </div>
    </div>
    </>
  )
}

export default PokedexPage
