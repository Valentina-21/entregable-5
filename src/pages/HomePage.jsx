import { useRef } from "react";
import { setTrainerSlice } from "../store/slices/trainer.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const inputTrainer = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTrainer = (e) => {
    e.preventDefault();
    dispatch(setTrainerSlice(inputTrainer.current.value.trim()));
    navigate("/pokedex");
  };

  return (
    <section className="homepage">
      <header className="homepage__header">
        <img
          className="homepage__header__img"
          src="./images/pokedex.png"
          alt=""
        />
      </header>
      <div className="homepage__body">
        <h2 className="homepage__title">Hi Trainer!</h2>
        <p className="homepage__subtitle">
          To start, please enter your trainer name
        </p>
        <form className="homepage__form" onSubmit={handleTrainer}>
          <input className="homepage__input" ref={inputTrainer} type="text" />
          <button className="homepage__button">Start!</button>
        </form>
      </div>
      <footer className="homepage__footer">
        <img
          className="homepage__footer__img"
          src="./images/portada.jpeg"
          alt=""
        />
      </footer>
    </section>
  );
};

export default HomePage;
