import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { deleteData } from "../services/service";
import CustomAlert from "./customalert";
import { useState } from "react";

export default function DeleteBook({ show, handleClose, book }) {
  const [showAlert, setShowAlert] = useState(false);
  const booksApiUrl = "http://localhost:3001/books";

  function handleCloseAlert() {
    setShowAlert(false);
  }
  const deleteImage = async (filename) => {
    try {
      const response = await fetch(
        `http://localhost:3001/uploads/${filename}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error deleting image:", errorData);
      } else {
        console.log("Image deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  async function deleteBook(id) {
    if (!book || !id) {
      console.error("Book ID is not defined");
      return;
    }

    try {
      if (book.image_URL !== "default_cover.jpg") {
        await deleteImage(book.image_URL);
      }
      const response = await deleteData(booksApiUrl, id);

      console.log("response", response);
      if (response !== 204) {
        throw new Error("Network response was not ok");
      } else {
        console.log("book deleted successfully:", id);
        setShowAlert(true);
        handleClose();
      }
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  }
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        animation={true}
      >
        <Modal.Header className="modal-header divheader" closeButton>
          <Modal.Title>Delete Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row" style={{ marginBottom: 15 }}>
              <p>
                Are you sure you want to delete this{" "}
                <b className="highlight">{book.title} </b> book?
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            variant="custom-orange"
            className="btn btnorange"
            data-bs-dismiss="modal"
            onClick={() => deleteBook(book.book_id)}
          >
            Yes
          </Button>
          <Button
            type="button"
            variant="custom-orange"
            className="btn btnorange"
            data-bs-dismiss="modal"
            onClick={() => handleClose()}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <CustomAlert
        showAlert={showAlert}
        handleCloseAlert={handleCloseAlert}
        name={"Book"}
        action={"Deleted"}
      />
    </>
  );
}
