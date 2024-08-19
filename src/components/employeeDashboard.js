import React, { useEffect, useState } from "react";
import { Table, Pagination } from "rsuite";
import * as MdIcons from "react-icons/md";
import EmployeeModal from "./EmployeeModal";
import { Form } from "react-bootstrap";

const { Column, HeaderCell, Cell } = Table;

const styles = {
  leftDisplay: {
    display: "flex",
    justifyContent: "left",
    alignItems: "left",
    padding: 20,
  },
  rightDisplay: {
    display: "flex",
    justifyContent: "right",
    alignItems: "right",
    padding: 20,
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  containerStyle: {
    padding: 30,
    display: "flex",
    flexDirection: "column",
  },
};

//this shows the dashboard to create new employee details and to view list of employeed
function EmployeeDashboard({ ...props }) {
  const [employeeList, setEmployeeList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [file, setFile] = useState(null);
  const [array, setArray] = useState([]);
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    employeeName: null,
    employeeNumber: null,
    employeeEmail: null,
    employeeAddress: null,
    employeeImg: "",
    employeeActive: null,
  });
  const [imgFile, setImgFile] = useState(null);

  useEffect(() => {}, []);

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  //this function is for edit and delete modal
  function modalpopup(data, modalType) {
    setShowModal(true);
    if (modalType == "EditEmployee") {
      setValues(() => ({
        ...values,
        employeeName: data.employeeName,
        employeeNumber: data.employeeNumber,
        employeeEmail: data.employeeEmail,
        modalType: "EditEmployee",
      }));
    }
    if (modalType == "DeleteEmployee") {
      setValues(() => ({
        ...values,
        employeeNumber: data.employeeNumber,
        modalType: "DeleteEmployee",
      }));
    }
  }

  //This function is to update the state of the employee details
  const onChangeInput = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onCheck = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.checked ? "Active" : "Inactive",
    });
  };

  //this created new list of employees with updated values and sets it to be the new employee list to de displayed
  function handleSubmitEdit() {
    //setEmployeeList();
    console.log("edit", values);
    const employeeListUpdated = employeeList.map((emp) => {
      if (emp.employeeNumber == values.employeeNumber) {
        return {
          ...emp,
          employeeName: values.employeeName,
          employeeEmail: values.employeeEmail,
          employeeAddress: values.employeeAddress,
        };
      } else {
        return emp;
      }
    });
    setEmployeeList(employeeListUpdated);
  }

  //adds employee to employee list array
  function addEmployee(employee) {
    console.log(employee);
    setEmployeeList([
      ...employeeList,
      {
        employeeName: values.employeeName,
        employeeNumber: values.employeeNumber,
        employeeEmail: values.employeeEmail,
        employeeAddress: values.employeeAddress,
        employeeDep: values.employeeDep,
        employeeActive: values.employeeActive,
        employeeImg: values.employeeImg,
      },
    ]);
  }

  //handles deletion of employee, function is still work in progress
  const handleSubmitDelete = async () => {
    const employeeListUpdated = [];
    employeeList.map((emp) => {
      if (emp.employeeNumber != values.employeeNumber) {
        employeeListUpdated.append(emp);
      }
    });
    setEmployeeList(employeeListUpdated);
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));

  return (
    <div style={styles.containerStyle}>
      {console.log(values)}
      <h3>Employee Dashboard</h3>
      <h5 style={styles.leftDisplay}>Add Employee</h5>
      <div style={styles.leftDisplay}>
        <Form.Group>
          <Form.Label>Employee Name : </Form.Label>
          <input
            id="employeeName"
            type="text"
            name="employeeName"
            value={values.employeeName}
            onChange={(e) => onChangeInput(e)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Employee Number : </Form.Label>
          <input
            id="employeeNumber"
            type="text"
            name="employeeNumber"
            value={values.employeeNumber}
            onChange={(e) => onChangeInput(e)}
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
          />
        </Form.Group>
      </div>
      <div style={styles.leftDisplay}>
        <Form.Group>
          <Form.Label>Employee Address : </Form.Label>
          <input
            id="employeeAddress"
            type="text"
            name="employeeAddress"
            value={values.employeeAddress}
            onChange={(e) => onChangeInput(e)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicSelect">
          <div style={styles.flexRow}>
            <Form.Label>Department : </Form.Label>
            <Form.Control
              as="select"
              name="employeeDep"
              //value={type}
              value={values.employeeDep}
              onChange={(e) => onChangeInput(e)}
            >
              <option value="IT">IT</option>
              <option value="Security">Security</option>
              <option value="Finance">Finance</option>
            </Form.Control>
          </div>
        </Form.Group>

        <Form.Group>
          <div style={styles.flexRow}>
            <Form.Label>Active : </Form.Label>
            <Form.Check
              id="employeeActive"
              name="employeeActive"
              value={values.employeeActive}
              //checked={values.employeeActive}
              onChange={(e) => onCheck(e)}
            />
          </div>
        </Form.Group>

        <div className="App">
          Add Image :
          <input
            type="file"
            name="employeeImg"
            value={values.employeeImg}
            onChange={(e) => setImgFile(URL.createObjectURL(e.target.files[0]))}
          />
          <img src={imgFile} />
        </div>
        <button onClick={addEmployee}>Create</button>
      </div>

      <h5 style={styles.leftDisplay}>Employee List</h5>

      <Table data={employeeList} loading={loading}>
        <Column width={250}>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="employeeName" />
        </Column>
        <Column width={250}>
          <HeaderCell>Number</HeaderCell>
          <Cell dataKey="employeeNumber" />
        </Column>
        <Column width={250}>
          <HeaderCell>Email</HeaderCell>
          <Cell dataKey="employeeEmail" />
        </Column>
        <Column width={250}>
          <HeaderCell>Address</HeaderCell>
          <Cell dataKey="employeeAddress" />
        </Column>
        <Column width={250}>
          <HeaderCell>Department</HeaderCell>
          <Cell dataKey="employeeDep" />
        </Column>
        <Column width={250}>
          <HeaderCell>Status</HeaderCell>
          <Cell dataKey="employeeActive" />
        </Column>
        <Column width={250}>
          <HeaderCell>Action</HeaderCell>
          <Cell>
            {(rowData) => (
              <>
                <span>
                  {
                    <MdIcons.MdOutlineEdit
                      onClick={() => modalpopup(rowData, "EditEmployee")}
                    />
                  }
                </span>
                <span>
                  {
                    <MdIcons.MdDeleteOutline
                      onClick={() => modalpopup(rowData, "DeleteEmployee")}
                    />
                  }
                </span>
              </>
            )}
          </Cell>
        </Column>
      </Table>
      <div style={{ padding: 20 }}>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="xs"
          layout={["total", "-", "limit", "|", "pager", "skip"]}
          total={employeeList.length}
          limitOptions={[5, 10, 15]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>

      <EmployeeModal
        show={showModal}
        onHide={() => setShowModal(!showModal)}
        values={values}
        onChangeInput={onChangeInput}
        handleSubmitEdit={handleSubmitEdit}
        handleSubmitDelete={handleSubmitDelete}
        headerKeys={headerKeys}
        array={array}
        error={error}
      />
    </div>
  );
}

export default EmployeeDashboard;
