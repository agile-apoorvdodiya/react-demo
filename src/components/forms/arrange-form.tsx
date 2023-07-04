import { useEffect, useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { EditControl } from "./edit-control";
import { Box, Button, Grid } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import "./arrange-form.scss";

const ID_LIST = {
  DROP_LIST_ID: "drop-list",
  SELECT_LIST_ID: "select-list",
};

export const ArrangeForm = (props: any) => {
  const [editControlModal, setEditControlModal] = useState<any>(null);
  const [editControlDetails, setEditControlDetails] = useState<any>(null);

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
  // useEffect(() => {
  //   console.log("props ", props);
  //   setSelectedItems(props.selectedList);
  // }, [props.selectedList]);

  useEffect(() => {
    props.onListUpdate("form", selectedItems);
  }, [selectedItems]);

  const handleDragEnd = (result: any) => {
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

      const newFormElement: any = {
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
    }
  };

  const deleteItem = (index: number) => {
    const updatedItems = [...selectedItems];
    updatedItems.splice(index, 1);
    setSelectedItems(updatedItems);
  };

  const handleEdit = (data: any, id: any) => {
    setEditControlModal("edit");
    setEditControlDetails({ ...data, id });
  };

  const handleUpdateControl = (data: any) => {
    console.log(data)
    const { id, ...control } = data;
    const existingList = [...selectedItems];
    existingList[id] = control;
    setSelectedItems(existingList);
  };

  return (
    <Grid container>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid item={true} xs={4} p={1}>
          <h4>ELEMENTS</h4>
          <Droppable droppableId={ID_LIST.SELECT_LIST_ID}>
            {(provided) => (
              <div
                className="item-container"
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
                      <div
                        style={{
                          top: "auto !important",
                          left: "auto !important",
                        }}
                        className="droppable-item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {item.labelView}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Grid>

        <Grid
          item={true}
          xs={8}
          p={1}
          sx={{ maxHeight: "60vh", overflowY: "auto" }}
        >
          <h4>FORM</h4>
          <Droppable droppableId={ID_LIST.DROP_LIST_ID}>
            {(provided) => (
              <div
                className={
                  selectedItems?.length === 0
                    ? "border border-gray-500 h-full"
                    : "h-full overflow-auto"
                }
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {selectedItems?.length === 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      height: "30vh",
                      border: "1px solid white",
                    }}
                  >
                    <span>Drop your elements here</span>
                  </Box>
                ) : (
                  <Box className="item-container">
                    {selectedItems?.map((item: any, index: any) => (
                      <Draggable
                        key={`selected-${item.id || item._id}`}
                        draggableId={item.id || item._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="droppable-item"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="w-2/5">{item.label}</div>
                            <div className="w-2/5">
                              {["radio", "checkbox"].includes(item.type) ? (
                                <div>
                                  {item.controls.map((c: any, index: any) => {
                                    return (
                                      <Box
                                        sx={{ display: "flex" }}
                                        key={`sub-control-${
                                          item.id || item._id
                                        }-${index}`}
                                      >
                                        <input
                                          type={item.type}
                                          name={item.name}
                                          value={c.value}
                                          id={c?._id}
                                        />
                                        <label htmlFor={c?._id}>
                                          {c.label}
                                        </label>
                                      </Box>
                                    );
                                  })}
                                </div>
                              ) : (
                                <>
                                  <input
                                    style={{ maxWidth: "120px" }}
                                    type={item.type}
                                    placeholder={item.placeholder}
                                  />
                                </>
                              )}
                            </div>
                            <div>
                              <Button onClick={() => handleEdit(item, index)}>
                                <Edit></Edit>
                              </Button>
                              <Button onClick={() => deleteItem(index)}>
                                <Delete></Delete>
                              </Button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </Box>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Grid>
      </DragDropContext>
      <EditControl
        modalState={editControlModal}
        setModalState={setEditControlModal}
        controlDetails={editControlDetails}
        onModalClose={handleUpdateControl}
      />
    </Grid>
  );
};
