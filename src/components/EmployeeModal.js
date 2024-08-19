import React from "react";
import { Modal } from "rsuite";
import { Form } from "react-bootstrap";

//shows the modal to edit or delete employee
function EmployeeModal({
  values,
  handleSubmitEdit,
  handleSubmitDelete,
  show,
  onHide,
  onChangeInput,
  handleOnChange,
  handleOnSubmit,
  headerKeys,
  array,
  error,
}) {
  return (
    <>
      <Modal centered open={show} onClose={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            {values.modalType == "EditEmployee" && "Edit Employee"}
            {values.modalType == "DeleteEmployee" && "Delete Employee"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {values.modalType == "EditEmployee" && (
            <>
              <Form.Group>
                <Form.Label>Employee Name : </Form.Label>
                <input
                  id="employeeName"
                  type="text"
                  name="employeeName"
                  value={values.employeeName}
                  onChange={(e) => onChangeInput(e)}
                  //onChange={(e) => console.log(e)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Employee Email : </Form.Label>
                <input
                  id="employeeEmail"
                  type="text"
                  name="employeeEmail"
                  value={values.employeeEmail}
                  onChange={(e) => onChangeInput(e)}
                  //onChange={(e) => console.log(e)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Employee Address : </Form.Label>
                <input
                  id="employeeAddress"
                  type="text"
                  name="employeeAddress"
                  value={values.employeeAddress}
                  onChange={(e) => onChangeInput(e)}
                  //onChange={(e) => console.log(e)}
                />
              </Form.Group>
            </>
          )}
          {values.modalType == "DeleteEmployee" && (
            <>
              Are you sure you want to delete the employee with id :
              {" " + values.employeeNumber}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {values.modalType == "EditEmployee" && (
            <button onClick={handleSubmitEdit}>Save</button>
          )}
          {values.modalType == "DeleteEmployee" && (
            <button onClick={handleSubmitDelete}>Delete</button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EmployeeModal;
