import React, { useEffect, useRef, useState } from "react";
import { css } from "../../../constants/classes";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { EditControl } from "./edit-control";

const ID_LIST = {
  DROP_LIST_ID: "drop-list",
  SELECT_LIST_ID: "select-list",
};

export const FormListEditor = (props) => {
  const editControlModal = useRef();
  const [selectionItems, setSelectionItems] = useState([
    { id: "item-text", labelView: "Text", type: "text" },
    { id: "item-number", labelView: "Number", type: "number" },
    { id: "item-email", labelView: "Email", type: "email" },
    { id: "item-date", labelView: "Date", type: "date" },
    { id: "item-password", labelView: "Password", type: "password" },
    { id: "item-checkbox", labelView: "Checkbox", type: "checkbox" },
    { id: "item-radio", labelView: "Radio", type: "radio" },
  ]);
  const [selectedItems, setSelectedItems] = useState(props.selectedList || []);
  useEffect(() => {
    setSelectedItems(props.selectedList);
  }, [props.selectedList]);

  useEffect(() => {
    props.onListUpdate('form', selectedItems);
  }, [selectedItems])
  

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (result.source.droppableId === result.destination.droppableId) {
      if (result.source.droppableId === ID_LIST.DROP_LIST_ID) {
        // re arrange list
        const updatedItems = [...selectedItems];
        const [removedItem] = updatedItems.splice(sourceIndex, 1);
        updatedItems.splice(destinationIndex, 0, removedItem);
        setSelectedItems(updatedItems);
      } else return;
    } else {
      const updatedItems = [...selectedItems];
      const selectedItem = selectionItems[sourceIndex];

      const newFormElement = {
        ...selectedItem,
        id: `${selectedItem.type}-${Date.now()}`,
        label: `Label ${selectedItems?.length + 1}`,
        name: "",
      };

      if (["radio", "checkbox"].includes(selectedItem.type)) {
        newFormElement.controls = [];
      } else {
        newFormElement.placeholder = "";
      }
      updatedItems.splice(destinationIndex, 0, newFormElement);
      setSelectedItems(updatedItems);
      // setSelectionItems(selectionItems);
    }
  };

  const updateControl = (index, data) => {
    const existingList = [...selectedItems];
    existingList[index] = data;
    setSelectedItems(existingList);
  };

  const deleteItem = (index) => {
    const updatedItems = [...selectedItems];
    updatedItems.splice(index, 1);
    setSelectedItems(updatedItems);
  };

  return (
    <div className="flex  ">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="p-2 mt-2 w-1/4 h-60 inline-block border border-gray-500">
          <h2>ELEMENTS</h2>
          <Droppable droppableId={ID_LIST.SELECT_LIST_ID}>
            {(provided) => (
              <ul
                className="list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {selectionItems.map((item, index) => (
                  <Draggable
                    key={`selection-${item.id}`}
                    draggableId={item.id}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        className="border border-gray-500 my-1 px-1"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {item.labelView}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>

        <div className="p-2 mt-2 w-3/4 h-60 inline-block border border-gray-500">
          <span>FORM</span>
          <Droppable droppableId={ID_LIST.DROP_LIST_ID}>
            {(provided) => (
              <ul
                className={
                  selectedItems.length === 0
                    ? "border border-gray-500 h-full"
                    : "h-full overflow-auto"
                }
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {selectedItems.length === 0 ? (
                  <div className="flex justify-center items-center h-full">
                    <span>Drop your elements here</span>
                  </div>
                ) : (
                  <div className="">
                    {selectedItems.map((item, index) => (
                      <Draggable
                        key={`selected-${item.id || item._id}`}
                        draggableId={item.id || item._id}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            className="flex border border-gray-500 my-1 px-1"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="w-2/5">{item.label}</div>
                            <div className="w-2/5">
                              {["radio", "checkbox"].includes(item.type) ? (
                                <div>
                                  {item.controls.map((c, index) => {
                                    return (
                                      <div className="inline-block pr-3" key={`sub-control-${item.id || item._id}-${index}`}>
                                        <input
                                          className="m-1"
                                          type={item.type}
                                          name={item.name}
                                          value={c.value}
                                          id={c?._id}
                                        />
                                        <label htmlFor={c?._id}>
                                          {c.label}
                                        </label>
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <>
                                  <input
                                    className={css.INPUT_TEXT}
                                    style={{ maxWidth: "120px" }}
                                    type={item.type}
                                    placeholder={item.placeholder}
                                  />
                                </>
                              )}
                            </div>
                            <div className="w-1/5">
                              <button
                                className="mx-1"
                                onClick={() =>
                                  editControlModal.current.open(item, index)
                                }
                              >
                                <i className="fa fa-pen fa-sm"></i>
                              </button>
                              <button
                                className="mx-1"
                                onClick={() => deleteItem(index)}
                              >
                                <i className="fa fa-trash fa-sm"></i>
                              </button>
                            </div>
                          </li>
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      </DragDropContext>
      <EditControl ref={editControlModal} onSuccess={updateControl} />
    </div>
  );
};
