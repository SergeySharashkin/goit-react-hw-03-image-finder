import { Component } from "react";
import { createPortal } from "react-dom";
import { Overlay, ModalWin } from "./Modal.styled";
const modalRoot = document.querySelector("#modal-root");
export class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeydown);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeydown);
  }
  handleKeydown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };
  handleOverlayClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <Overlay onClick={this.handleOverlayClick}>
        <ModalWin>{this.props.cildren}</ModalWin>
      </Overlay>,
      modalRoot
    );
  }
}
