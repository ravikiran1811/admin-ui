import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TextField,
  Pagination,
} from "@mui/material";
import React, { useEffect } from "react";
import styles from "./index.module.css";
import editIcon from "../../assets/edit-icon.png";
import deleteIcon from "../../assets/trash-icon.png";
import saveIcon from "../../assets/save-icon.webp";
interface dataProps {
  id: string;
  name: string;
  email: string;
  role: string;
}
interface dataPropsArray {
  data: dataProps[];
}
const DataRow: React.FC<dataPropsArray> = ({ data }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [checkedCount, setCheckedCount] = React.useState(0);
  const [editIndex, setEditIndex] = React.useState(-1);
  const [firstPageDisabled, setFirstPageDisabled] = React.useState(false);
  const [lastPageDisabled, setLastPageDisabled] = React.useState(false);
  const rowsPerPage = 10;
  const checkboxAddedData = data.map((item) => ({
    ...item,
    checkbox: false,
  }));
  const paginatedData = checkboxAddedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const [mainData, setMainData] = React.useState(checkboxAddedData);
  const [totalData, setTotalData] = React.useState(paginatedData);
  const [editedData, setEditedData] = React.useState({
    name: "",
    email: "",
    role: "",
  });
  const totalDataLength = Math.floor(checkboxAddedData.length / rowsPerPage);
  const remainder = checkboxAddedData.length % rowsPerPage;
  const [paginationCount, setPaginationCount] = React.useState(
    totalDataLength + (remainder > 0 ? 1 : 0)
  );

  const [allCheckboxes, setAllCheckboxes] = React.useState(false);
  const tableHeaders = Object.keys(data[0]).filter((key) => key !== "id");
  console.log("hello",tableHeaders);

  const onEdit = (index: string) => {
    setEditIndex(parseInt(index));
    const rowData = mainData.find((item) => item.id === index);
    if (rowData) {
      setEditedData({
        name: rowData.name,
        email: rowData.email,
        role: rowData.role,
      });
    }
  };

  const onDelete = (index: number) => {
    setTotalData(totalData.filter((_, i) => i !== index));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = checkboxAddedData.filter(
      (value) =>
        value.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        value.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
        value.role.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (e.target.value === "") {
      setMainData(checkboxAddedData);
    }
    console.log(updatedData);
    setMainData(updatedData);
    const paginatedData = updatedData.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
    setTotalData(paginatedData);
    const totalDataLength = Math.floor(updatedData.length / rowsPerPage);
    const remainder = updatedData.length % rowsPerPage;
    setPaginationCount(totalDataLength + (remainder > 0 ? 1 : 0));
  };
  const handleCheckbox = () => {
    setAllCheckboxes(!allCheckboxes);
    const updatedData = totalData.map((item) => ({
      ...item,
      checkbox: !allCheckboxes,
    }));

    setTotalData(updatedData);
    console.log(totalData);
    setCheckedCount(allCheckboxes ? 0 : totalData.length);
  };

  const onDeleteAll = () => {
    console.log(totalData);
    console.log(mainData);
    totalData.forEach((totalItem) => {
      const mainItem = mainData.find(
        (mainItem) => mainItem.id === totalItem.id
      );
      if (mainItem) {
        mainItem.checkbox = totalItem.checkbox;
      }
    });

    console.log(mainData);
    const updatedData = mainData.filter((item) => !item.checkbox);
    const paginatedData = updatedData.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
    setMainData(updatedData);
    setTotalData(paginatedData);
    setCheckedCount(0);
    setAllCheckboxes(false);
    const totalDataLength = Math.floor(updatedData.length / rowsPerPage);
    const remainder = updatedData.length % rowsPerPage;
    setPaginationCount(totalDataLength + (remainder > 0 ? 1 : 0));
  };
  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    console.log(value);
    const paginatedData = mainData.slice(
      (value - 1) * rowsPerPage,
      value * rowsPerPage
    );
    setTotalData(paginatedData);
    setCurrentPage(value);
    setAllCheckboxes(false);
    setCheckedCount(0);
  };
  const handleIndividulCheckbox = (index: number) => {
    totalData[index].checkbox = !totalData[index].checkbox;
    setTotalData([...totalData]);
    const checkedCount = totalData.filter((item) => item.checkbox).length;
    setCheckedCount(checkedCount);
  };
  const firstpage = () => {
    setCurrentPage(1);
    const paginatedData = checkboxAddedData.slice(0, rowsPerPage);
    setTotalData(paginatedData);
  };
  const lastpage = () => {
    setCurrentPage(paginationCount);
    const paginatedData = checkboxAddedData.slice(
      (paginationCount - 1) * rowsPerPage,
      paginationCount * rowsPerPage
    );
    setTotalData(paginatedData);
  };
  useEffect(() => {
    if (currentPage === 1) {
      setFirstPageDisabled(true);
    } else {
      setFirstPageDisabled(false);
    }
    if (currentPage === paginationCount) {
      setLastPageDisabled(true);
    } else {
      setLastPageDisabled(false);
    }
  }, [currentPage, paginationCount, mainData]);
  const handleEditSave = () => {
    const updatedData = mainData.map((item, index) =>
      index === editIndex - 1
        ? { ...item, ...editedData, checkbox: false }
        : item
    );
    console.log(editedData);
    const paginatedData = updatedData.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
    setTotalData(paginatedData);
    console.log(updatedData);
    setMainData(updatedData);
    setEditIndex(-1);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof typeof editedData
  ) => {
    setEditedData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };
  return (
    <div className={styles.container}>
      <TextField
        id="outlined-basic"
        label=""
        variant="outlined"
        placeholder="Search by name, email, role"
        sx={{
          width: "90%",
          textAlign: "center",
          alignSelf: "center",
          ".MuiInputBase-input": {
            height: "10px !important",
          },
        }}
        className={styles.searchIcon}
        onChange={handleSearch}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <input
                  type="checkbox"
                  checked={allCheckboxes}
                  onChange={handleCheckbox}
                />
              </TableCell>
              {tableHeaders.map((key, index) => (
                <TableCell
                  sx={{ fontWeight: 700, textTransform: "capitalize" }}
                  key={index}
                >
                  {key}
                </TableCell>
              ))}
              <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {totalData.length !== 0 ? (
              totalData.map((row, index) => (
                <TableRow
                  key={row.id}
                  className={row.checkbox ? styles.checked : styles.unchecked}
                >
                  <TableCell>
                    <input
                      onChange={() => handleIndividulCheckbox(index)}
                      checked={row.checkbox}
                      type="checkbox"
                    />
                  </TableCell>
                  {tableHeaders.map((key, index) => (
                    <TableCell key={index}>
                      {editIndex === parseInt(row.id) ? (
                        <input
                          type="text"
                          value={editedData[key as keyof typeof editedData]}
                          onChange={(e) =>
                            handleChange(e, key as keyof typeof editedData)
                          }
                        />
                      ) : (
                        row[key as keyof typeof row]
                      )}
                    </TableCell>
                  ))}

                  <TableCell className={styles.actionItem}>
                    {editIndex !== parseInt(row.id) && (
                      <div className={styles.actioncONTAINER}>
                        <img
                          src={editIcon}
                          className={styles.edit}
                          onClick={() => onEdit(row.id)}
                        />

                        <img
                          className={styles.delete}
                          onClick={() => onDelete(index)}
                          src={deleteIcon}
                        />
                      </div>
                    )}
                    {editIndex === parseInt(row.id) && (
                      <img
                        className={styles.save}
                        onClick={handleEditSave}
                        src={saveIcon}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No data found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.lastContainer}>
        {checkedCount > 1 && (
          <button className={styles.deleteAll} onClick={onDeleteAll}>
            Delete all
          </button>
        )}
        <div className={styles.paginationContainer}>
          <button
            className={
              firstPageDisabled ? styles.firstPageDisabled : styles.firstPage
            }
            disabled={firstPageDisabled}
            onClick={firstpage}
          >
            first page
          </button>
          <Pagination
            count={paginationCount}
            color="primary"
            page={currentPage}
            onChange={handlePagination}
          />
          <button
            className={
              lastPageDisabled ? styles.lastPageDisabled : styles.lastPage
            }
            disabled={lastPageDisabled}
            onClick={lastpage}
          >
            last page
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataRow;
