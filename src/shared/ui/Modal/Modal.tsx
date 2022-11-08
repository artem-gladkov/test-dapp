import {IModalInfoProps, ModalInfo} from "./ModalInfo";
import {createRoot} from "react-dom/client";
import {BaseModal, IBaseModalProps} from "./BaseModal";

//TODO доработать появление и анимацию модального окна
export const Modal = {
  info: (props: IModalInfoProps) => {
    const modalContainer = document.createElement('div')
    modalContainer.classList.add('modal-container')

    const modalsRoot = createRoot(modalContainer)
    modalsRoot.render(<ModalInfo {...props}/>)
  },
  base: (props: IBaseModalProps) => {
    const modalContainer = document.createElement('div')
    modalContainer.classList.add('modal-container')

    const modalsRoot = createRoot(modalContainer)
    modalsRoot.render(<BaseModal {...props}/>)
  }
}
