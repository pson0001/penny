import { createPortal } from "react-dom";
import c from "./add-item.module.scss";
const AddItem = ({ onClose }) => {
  return createPortal(
    <div className={c.background}>
      <div className="portal-content">
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.getElementById("root")
  );
};

export default AddItem;
