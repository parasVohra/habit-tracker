import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";

function RenderModel({ data }) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {data.map(h => {
          return <div>{h.habitName}</div>;
        })}
      </Modal>
    </div>
  );
}

export default RenderModel;
