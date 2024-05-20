import { forwardRef } from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

interface PopupProps {
  isOpen: boolean;
  handleOpenClose: () => void;
  children: JSX.Element;
}

const Popup = forwardRef<HTMLDivElement, PopupProps>((props, ref) => {
  const { isOpen, handleOpenClose, children } = props;

  return (
    <Modal
      open={isOpen}
      onClose={handleOpenClose}
      closeAfterTransition
      slots={{
        backdrop: Backdrop,
      }}
      slotProps={{
        backdrop: {
          timeout: 800,
        },
      }}
    >
      <Fade in={isOpen}>
        <div ref={ref}>{children}</div>
      </Fade>
    </Modal>
  );
});

export default Popup;
