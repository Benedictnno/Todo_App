import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

function Lister({ items, removeItem, editItem }) {
  return (
    <div>
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="grocery-item">
            <p className="title">{title}</p>
            <div>
              <button onClick={() => editItem(id)} className="edit-btn">
                edit <FaRegEdit/>
              </button>
              <button onClick={() => removeItem(id)} className="delete-btn">
                remove <RiDeleteBin6Line/>
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default Lister;
