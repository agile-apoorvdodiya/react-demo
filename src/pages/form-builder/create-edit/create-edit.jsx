import { useState } from "react";
import "./create-edit.css";

export const CreateEdit = (props) => {
  const controls = ["Text", "Password", "Radio", "Checkbox"];
  const [selected, setSelected] = useState([]);
  let current = null;
  const handleDrop = (e) => {
    if (e?.dataTransfer?.getData("control")) {
      const data = JSON.parse(e?.dataTransfer?.getData("control") || "");
      if (data.action === "add") {
        if (["Radio", "Checkbox"].includes(data.control)) {
          selected.push({
            type: data.control.toLowerCase(),
          });
        } else {
          selected.push({
            type: data.control.toLowerCase(),
          });
        }
        setSelected([...selected]);
      } else if (data.action === "sort") {
        const element = selected.splice(data.index, 1);
        selected.splice(current, 0, ...element);
        setSelected([...selected]);
      }
    }
  };

  const handleAddControl = (e, control) => {
    e.dataTransfer.setData(
      "control",
      JSON.stringify({
        control,
        action: "add",
      })
    );
  };
  const handleSortForm = (e, i) => {
    e.dataTransfer.setData(
      "control",
      JSON.stringify({ index: i, action: "sort" })
    );
  };

  const dragEnd = (pos) => {
    current = pos;
  };
  return (
    <div>
      <div className="row">
        <div className="col-2 me-4">
          <div className="display-4 mb-2">Controls</div>
          <div id="controls" className="drag-container">
            {controls.map((control, i) => {
              return (
                <div
                  key={"control-" + i}
                  className="drag-item"
                  draggable
                  onDragStart={(e) => handleAddControl(e, control)}
                >
                  {control}
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-6">
          <div className="display-4 mb-2">Form</div>
          <div
            id="drop-box"
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={handleDrop}
            className="drag-container"
          >
            <div className="drag-item">
              <input
                type="text"
                placeholder="Enter title"
                style={{ background: "transparent", color: "white" }}
              />
            </div>

            {selected.map((sel, i) => {
              return (
                <div
                  className="drag-item"
                  key={"sel-" + i}
                  draggable
                  onDragStart={(e) => handleSortForm(e, i)}
                  onDragEnter={(e) => dragEnd(i)}
                >
                  {sel.type}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
