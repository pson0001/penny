import { useState } from "react";
import Icon from "../icon/Icon";
import c from "./page-container.module.scss";
import AddItem from "../addItem/AddItem";
const PageContainer = ({ children }) => {
  const [addItemModal, setAddItemModal] = useState(false);

  const openModal = () => {
    setAddItemModal(true);
  };

  const closeModal = () => {
    setAddItemModal(false);
  };
  return (
    <div className={c.pageContainer}>
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
