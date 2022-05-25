import { useState } from "react";
import "./create-edit.css";

export const CreateEdit = (props) => {
  const controls = ["Text", "Password", "Radio", "Checkbox"];
  const [selected, setSelected] = useState([]);
  const handleDrop = (e) => {
    const data = e?.dataTransfer?.getData("control");
    if (["Radio", "Checkbox"].includes(data)) {
      selected.push({
        type: data.toLowerCase(),
      });
      setSelected([...selected]);
    } else {
      selected.push({
        type: data.toLowerCase(),
      });
      setSelected([...selected]);
    }
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
                  onDragStart={(e) => {
                    e.dataTransfer.setData("control", control);
                  }}
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
            onDragEnter={(e) => {
              console.log();
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // console.log("drag over");
            }}
            onDrop={handleDrop}
            className="drag-container"
          >
            <div className="drag-item">
              <input type="text" placeholder="Enter title" style={{background: 'transparent', color: 'white'}} />
            </div>

            {selected.map((sel, i) => {
              return (
                <div className="drag-item" key={"sel-" + i}>
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
