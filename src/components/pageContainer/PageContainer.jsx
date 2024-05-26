import { useEffect, useState } from "react";
import Icon from "../icon/Icon";
import c from "./page-container.module.scss";
import AddItem from "../addItem/AddItem";
import { useSwipeable } from "react-swipeable";
import { useNavigate, useLocation } from "react-router-dom";
const PageContainer = ({ children }) => {
  const [addItemModal, setAddItemModal] = useState(false);

  const openModal = () => {
    setAddItemModal(true);
  };

  const closeModal = () => {
    setAddItemModal(false);
  };

  const pages = ["/", "/calendar", "/stats", "/summary", "/categories"];
  const location = useLocation().pathname;
  const navigate = useNavigate();

  // const [swipeDirection, setSwipeDirection] = useState("");
  const handlers = useSwipeable({
    onSwiped: (eventData) => swipePage(eventData.dir),
    delta: 50,
  });

  const swipePage = (swipeDirection) => {
    const index = pages.indexOf(location);

    if (swipeDirection === "Left") {
      if (index + 1 >= pages.length) {
        navigate(pages[0], { replace: true });
      } else {
        navigate(pages[index + 1], { replace: true });
      }
    } else if (swipeDirection === "Right") {
      if (index - 1 < 0) {
        navigate(pages[pages.length - 1], { replace: true });
      } else {
        navigate(pages[index - 1], { replace: true });
      }
    }
  };

  return (
    <div className={c.pageContainer} {...handlers}>
      <div className={c.page}>{children}</div>

      <div className={c.addContainer}>
        <button className={c.add} onClick={openModal}>
          <Icon.Plus color="black" size={"2rem"} />
        </button>
      </div>

      {addItemModal && <AddItem onClose={closeModal}></AddItem>}
    </div>
  );
};
export default PageContainer;
