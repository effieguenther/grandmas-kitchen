import { useEffect, useState } from "react";
import { debounce } from "lodash";
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

  // cache and state //

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

  // animation variables //

  const [activeRecipes, setActiveRecipes] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const slideUpAnimation = useTransition(true, slideUp);
  const cardAnimation = useTransition(activeRecipes, cardSwipe);

  // maintain the current recipe as the user navigates for animation purposes //

  useEffect(() => {
    if (recipeData?.recipes) {
      setActiveIndex(0);
      setActiveRecipes(recipeData.recipes[0]);
    }
  }, [recipeData]);

  useEffect(() => {
    setActiveRecipes(recipeData?.recipes[activeIndex]);
  }, [activeIndex]);

  // debounce the navigation for better UX //

  const handleNav = debounce((direction) => {
    setActiveIndex((prevIndex) => {
      if (direction === "next") {
        return prevIndex === recipeData.recipes.length - 1 ? prevIndex : prevIndex + 1;
      } else if (direction === "prev") {
        return prevIndex === 0 ? prevIndex : prevIndex - 1;
      }
    });
  }, 180);
  

  // helper functions for rendering //

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

  // final return //

  return (
    <>
      <SearchBar searchFunction={setSearchCriteria} />
      <Container>
        {!searchCriteria ? <Tutorial /> : <Navigation />}
        {recipeIsLoading ? (
          <Loading />
        ) : recipeIsError ? (
          <p className="text-center mt-4">{recipeError.message}</p>
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
