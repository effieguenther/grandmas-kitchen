import { useEffect, useState, useMemo } from "react";
import { useQuery } from "react-query";
import { Container } from "reactstrap";
import { useTransition, animated } from "@react-spring/web";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { post } from "../utils/fetch";
import { slideUp, cardSwipe } from "../utils/animations";
import Recipe from "./Recipe";
import SearchBar from "./SearchBar";
import Loading from "./Loading";
import "../css/search.css";

export default function RecipeList() {
  const [searchCriteria, setSearchCriteria] = useState(null);
  const {
    data: recipeData,
    isLoading: recipeIsLoading,
    isError: recipeIsError,
    error: recipeError,
  } = useQuery(
    ["recipes", searchCriteria],
    () => post("recipes/search", searchCriteria),
    { enabled: !!searchCriteria, staleTime: Infinity }
  );

  const [activeRecipes, setActiveRecipes] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const slideUpAnimation = useTransition(true, slideUp);
  const cardAnimation = useTransition(activeRecipes, cardSwipe);
  let timerId = undefined;

  //whenever recipes array changes, set the active recipe to first recipe
  useEffect(() => {
    if (recipeData?.recipes) {
      setActiveIndex(0);
      setActiveRecipes(recipeData.recipes[0]);
    }
  }, [recipeData]);

  //when activeIndex changes, set activeRecipes
  useEffect(() => {
    setActiveRecipes(recipeData?.recipes[activeIndex]);
  }, [activeIndex]);

  //TODO: replace with debouncing
  //prevents rapid fire state updates with throttling
  const handleNav = (direction) => {
    if (timerId) {
      return;
    }

    timerId = setTimeout(() => {
      if (direction === "next") {
        if (activeIndex === recipeData.recipes.length - 1) {
          timerId = undefined;
          return;
        }
        setActiveIndex((prevIndex) => prevIndex + 1);
      } else if (direction === "prev") {
        if (activeIndex === 0) {
          timerId = undefined;
          return;
        }
        setActiveIndex((prevIndex) => prevIndex - 1);
      }
      timerId = undefined;
    }, 180);
    return;
  };

  const Tutorial = () => {
    return slideUpAnimation(
      (style, item) =>
        item && (
          <animated.div className="tutorial" style={style}>
            <p>Welcome!</p>
            <p>
              To get started, type a word or select a category above and click
              "Search."
            </p>
          </animated.div>
        )
    );
  };

  const Navigation = () => {
    if (recipeIsLoading) return <></>;
    if (recipeData?.recipes?.length !== 0 && !recipeIsLoading) {
      return (
        <div className="search-results">
          <button
            className="white-btn arrow-btn left-arrow"
            onClick={() => handleNav("prev")}
            disabled={activeIndex === 0}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <p className="">
            {activeIndex + 1} of {recipeData?.recipes?.length}
          </p>
          <button
            className="white-btn arrow-btn right-arrow"
            onClick={() => handleNav("next")}
            disabled={activeIndex === recipeData?.recipes?.length - 1}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      );
    }
    if (searchCriteria)
      return (
        <p className="search-results">No results! Try a broader search?</p>
      );
    return <></>;
  };


  return (
    <>
      <SearchBar searchFunction={setSearchCriteria} />
      <Container>
        {!searchCriteria ? <Tutorial /> : <Navigation />}
        {recipeIsLoading ? (
          <Loading />
        ) : recipeIsError ? (
          <p className="text-center mt-4">{recipeError}</p>
        ) : recipeData?.recipes?.length > 0 ? (
          cardAnimation((style, recipe) => (
            <animated.div style={{ ...style, width: "100%" }}>
              <Recipe recipe={recipe} />
            </animated.div>
          ))
        ) : searchCriteria ? (
          <p className="text-center mt-4">no results</p>
        ) : null}
      </Container>
    </>
  );
}
