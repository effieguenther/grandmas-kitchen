import {
  Card,
  CardTitle,
  Col,
  Row,
  Container,
  Modal,
  Tooltip,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { useQueryClient, useQuery } from "react-query";
import "../recipe.css";
import { put, post } from "../../../utils/fetch";
import CommentList from "../../comments/CommentList";
import RecipeEditModal from "../edit-recipe-modal/RecipeEditModal";
import DeleteRecipeModal from "../delete-recipe-modal/DeleteRecipeModal";
import Loading from "../../Loading";

export default function Recipe({ recipe }) {
  const title = recipe.title.toUpperCase();
  const ingredient_groups = recipe.ingredients;
  const { source, category, equipment, _id: id } = recipe;

  const { data: userData } = useQuery("currentUser", () => post("users"));
  const { ...pdfData } = useQuery(["pdf", id], async () => {
    const response = await post(`recipes/pdf/${id}`, {}, "blob");
    const pdfBlob = new Blob([response], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    return pdfUrl;
  });
  const queryClient = useQueryClient();

  const [favorite, setFavorite] = useState(false);
  const [favIsLoading, setFavIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // change to mutation
  const addToFavorites = async () => {
    try {
      setFavIsLoading(true);
      await put("users/updateFavorites", { favorite: id });
      //triggers another call to get current user to update favorites list
      queryClient.invalidateQueries("currentUser");
      setFavorite(!favorite);
    } catch (err) {
      console.err(err);
      setFavIsLoading(false);
    }
  };

  useEffect(() => {
    setFavIsLoading(false);
  }, [favorite]);

  useEffect(() => {
    if (userData.user) {
      const inFavorites = userData.user.favorites.includes(id);
      setFavorite(inFavorites);
    }
  }, [userData, id]);

  // adds randomized stains to each recipe //

  const blob1 = useRef();
  const blob2 = useRef();
  const blob3 = useRef();
  const card = useRef();
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    const randomSize1 = getRandomNumber(30, 60);
    const randomSize2 = getRandomNumber(45, 75);
    const randomSize3 = getRandomNumber(75, 100);

    blob1.current.style.width = randomSize1 + "px";
    blob1.current.style.height = randomSize1 + "px";
    blob1.current.style.top =
      getRandomNumber(100, card.current.clientHeight - randomSize1) + "px";
    blob1.current.style.left =
      getRandomNumber(20, card.current.clientWidth - randomSize1) + "px";
    blob1.current.style.borderRadius = `${randomSize1}% ${randomSize2}% ${randomSize3}% 33%`;

    blob2.current.style.width = randomSize2 + "px";
    blob2.current.style.height = randomSize2 + "px";
    blob2.current.style.top =
      getRandomNumber(100, card.current.clientHeight - randomSize2) + "px";
    blob2.current.style.left =
      getRandomNumber(20, card.current.clientWidth - randomSize2) + "px";
    blob2.current.style.borderRadius = `${randomSize2}% ${randomSize1}% ${randomSize3}% 33%`;

    blob3.current.style.width = randomSize3 + "px";
    blob3.current.style.height = randomSize3 + "px";
    blob3.current.style.top =
      getRandomNumber(100, card.current.clientHeight - randomSize3) + "px";
    blob3.current.style.left =
      getRandomNumber(20, card.current.clientWidth - randomSize3) + "px";
    blob3.current.style.borderRadius = `${randomSize3}% ${randomSize1}% ${randomSize2}% 33%`;
  }, []);

  // helper functions for rendering //

  const IngredientBody = () => (
    <>
      <Row>
        {ingredient_groups.map((group, idx) => (
          <Col key={idx}>
            {ingredient_groups.length > 1 && (
              <p className="group-title">{group.title}</p>
            )}
            <ul>
              {group.ingredients.map((ingredient, idx) => (
                <li key={idx}>{ingredient}</li>
              ))}
            </ul>
          </Col>
        ))}
        {equipment.length > 0 && (
          <ul className="equipment">
            <li>
              <span className="bold">equipment: </span>
              {equipment.map((equipment, idx) => (
                <span key={idx}>{equipment}</span>
              ))}
            </li>
          </ul>
        )}
      </Row>
      <Row>
        <Col>
          <ul>
            {recipe.directions.map((direction, idx) => (
              <li key={idx}>{direction}</li>
            ))}
          </ul>
        </Col>
      </Row>

      {/* these buttons only appear if admin is logged in */}
      <Row>
        {userData.user?.email === "effiegguenther@gmail.com" && (
          <div className="d-flex justify-content-center">
            <button
              className="blue-btn me-2"
              onClick={() => setEditOpen(!editOpen)}
            >
              Edit
            </button>
            <button
              className="grey-btn"
              onClick={() => setDeleteOpen(!deleteOpen)}
            >
              Delete
            </button>
            <RecipeEditModal
              isOpen={editOpen}
              setIsOpen={setEditOpen}
              recipe={recipe}
            />
            <DeleteRecipeModal
              isOpen={deleteOpen}
              setIsOpen={setDeleteOpen}
              recipeId={id}
            />
          </div>
        )}
      </Row>
    </>
  );

  // final return //

  return (
    <Row>
      <Col xs="12" lg="7">
        <div ref={card}>
          <Card className="recipe-card">
            <CardTitle>
              <Row className="mb-1">
                <Col xs="7" sm="9">
                  {title}
                </Col>
                <Col className="recipe-btns">
                  <button
                    onClick={() => setModalOpen(!modalOpen)}
                    className="blue-btn"
                  >
                    <FontAwesomeIcon icon={faPrint} />
                  </button>
                  {favIsLoading ? (
                    //loading symbol to display while add/remove from favorites
                    <button
                      disabled
                      className={favorite ? "pink-btn" : "blue-btn"}
                    >
                      <FontAwesomeIcon icon={faHeart} beat className="loader" />
                    </button>
                  ) : (
                    //favorites button
                    <button
                      className={favorite ? "pink-btn" : "blue-btn"}
                      onClick={addToFavorites}
                      disabled={userData.user ? false : true}
                      id="favoriteBtn"
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                  )}
                  {
                    //tooltip to display on favorite button when user is not logged in
                    !userData.user && (
                      <Tooltip
                        isOpen={tooltipOpen}
                        target="favoriteBtn"
                        toggle={() => setTooltipOpen(!tooltipOpen)}
                        placement="bottom"
                      >
                        Log in to favorite
                      </Tooltip>
                    )
                  }
                </Col>
              </Row>
              <Row className="subtitle">
                <Col xs="12">
                  <p>
                    <span className="bold">source: </span>
                    {source}
                  </p>
                </Col>
                <Col>
                  <p>
                    <span className="bold">category: </span> {category}
                  </p>
                </Col>
              </Row>
            </CardTitle>
            <Container fluid>
              <hr />
              <IngredientBody />
            </Container>
          </Card>
          <div className="blob" ref={blob1}></div>
          <div className="blob" ref={blob2}></div>
          <div className="blob" ref={blob3}></div>
        </div>
      </Col>
      <Col>
        <CommentList recipeId={id} />
      </Col>

      {/* This modal exists because for security purposes, opening a new tab has to be directly triggered by 
      a user action. Maybe replace this with the button being disabled until loading is finished? */}
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
        {pdfData.isLoading ? (
          <Loading />
        ) : (
          <div className="d-flex align-items-center justify-content-center py-5">
            <a
              href={pdfData.data}
              target="_blank"
              className="me-3"
              rel="noreferrer"
            >
              Open PDF
            </a>
            <button
              className="grey-btn ms-4"
              onClick={() => setModalOpen(false)}
            >
              Go Back
            </button>
          </div>
        )}
      </Modal>
    </Row>
  );
}
