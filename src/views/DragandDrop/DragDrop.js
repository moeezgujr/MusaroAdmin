import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./DragnDrop.css";
import { ReactComponent as Penicon } from "../../assets/img/pen.svg";
import { ReactComponent as DeleteIcon } from "../../assets/img/delete.svg";
import { updateProfessionOrder } from "Apis/Profession";
const ItemType = "LIST_ITEM";
const imageUrl = process.env.REACT_APP_IMAGE_SRC;

// Drag-and-drop item component
const DraggableItem = ({ item, index, moveItem, handleTabClick }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))}>
      {/* {item} */}
      <ProfessionCard
        imageUrl={imageUrl + item.img}
        paragraph={item.description}
        title={item.name}
        createdOn={item.createdAt}
        id={item._id}
        handleTabClick={handleTabClick}
      />
    </div>
  );
};

const ProfessionCard = ({
  imageUrl,
  paragraph,
  title,
  handleTabClick,
  id,
  createdOn,
}) => {
  return (
    <div className="profession-card">
      <div className="d-flex align-items-center">
        {/* Drag-and-Drop Icon */}
        <div className="drag-icon">☰</div>

        <img src={imageUrl} alt="Card" className="card-image" />
      </div>
      <div className="card-content" style={{ width: "100%" }}>
        <div className="d-flex justify-content-between">
          <div className="d-flex-col">
            <p className="text-profession-title">{title}</p>
            <p className="card-date mt-1">
              Created on: {createdOn.split("T")[0].replaceAll("-", "/")}
            </p>
          </div>
          <div className="d-flex">
            <div
              className="tab-1 tab edit-btn"
              onClick={() => handleTabClick(id)}
            >
              <Penicon />
            </div>
            <div
              className="tab-1 tab edit-btn"
              onClick={() => handleTabClick(id, "delete")}
            >
              <DeleteIcon />
            </div>
          </div>
        </div>
        <p className="mt-3 paragrahph-text">{paragraph}</p>
      </div>
    </div>
  );
};

// Main drag-and-drop list component
const DragAndDropList = ({ profession, handleTabClick, setProfession }) => {
  // const [items, setItems] = useState(["Item 1", "Item 2", "Item 3", "Item 4"]);

  const moveItem = (fromIndex, toIndex) => {
    let updatedItems = [...profession];

    const draggedItem = updatedItems[fromIndex]; // Item being dragged
    const replacedItem = updatedItems[toIndex]; // Item at the target position

    // Remove the dragged item from its original position
    const [removed] = updatedItems.splice(fromIndex, 1);

    // Insert the dragged item at the new position
    updatedItems.splice(toIndex, 0, removed);

    // Update the state
    setProfession(updatedItems);

    // Log the dragged item and the replaced item
    console.log("Drag-and-Drop Action:", {
      draggedItem: {
        profession_id: draggedItem._id,
        fromIndex,
        toIndex,
      },
      replacedItem: {
        replacedItem,
        toIndex,
        fromIndex,
      },
    });
    // updatedItems = updatedItems.map((item) => {
    //   return {
    //     professionId: item._id,
    //     index: item.index,
    //   };
    // });
    const items = [
      {
        professionId: draggedItem._id,
        index: toIndex+1,
      },
      {
        professionId: replacedItem._id,
        index: fromIndex+1,
      },
    ];
    const body = {
      professions: items,
    };
    updateProfessionOrder(body);
    console.log({});
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {profession.map((item, index) => (
          <DraggableItem
            key={index}
            index={index}
            item={item}
            moveItem={moveItem}
            handleTabClick={handleTabClick}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default DragAndDropList;
