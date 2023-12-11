import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function Modal({ note }) {
  return (
    <ToastContainer
        className="p-3"
        position={'bottom-center'}
        style={{ zIndex: 1 }}
    >
        <Toast className="toast">
            <Toast.Header className="toast-header" closeButton={false}>
                <strong className="me-auto">Notification</strong>
            </Toast.Header>
            <Toast.Body className="toast-body">{note}</Toast.Body>
        </Toast>
    </ToastContainer>
  );
}

export default Modal;