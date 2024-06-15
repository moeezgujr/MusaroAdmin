import React from "react";
import "./table.css";
import { ReactComponent as EditIcon } from "../../assets/img/edit.svg";
import { ReactComponent as DeleteIcon } from "../../assets/img/delete.svg";
import { ReactComponent as Detailicon } from "../../assets/img/detailicon.svg";

export const TableWithPagination = ({
  headers,
  data,
  currentPage,
  totalPages,
  onPageChange,
  callback,
  id,
  isPaginationShow,
}) => {
  const renderCell = (value, label) => {
    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value);
    }
    if(label === 'createdAt'){
      return new Date(value).toLocaleDateString()
    }
    return value;
  };
  function capitalizeFirstLetterOnly(str) {
    try{
    return str
      ?.split(" ")
      ?.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      ?.join(" ");
    }
    catch{
      return str
    }
  }
  return (
    <>
      <table id="customers">
        <thead>
          <tr>
            <>
              {headers?.map((header, index) => (
                <th key={index}>{header.label}</th>
              ))}
              {id !== "cancel" && <th key={"-1"}>{"Actions"}</th>}
            </>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, rowIndex) => (
            <tr key={rowIndex}>
              <>
                {" "}
                {headers?.map((header, colIndex) => (
                  <td key={colIndex}>
                    <p
                      className={
                        header.label == "Role" || header.label === "Status"
                          ? "role_td table_text"
                          : "table_text"
                      }
                      style={{ marginTop: "10px", marginBottom: "10px" }}
                    >
                      {capitalizeFirstLetterOnly(
                        renderCell(item[header.value], header.value)
                      )}
                    </p>
                  </td>
                ))}
                {id === "workshop" || id === "customer" || id === "provider" ? (
                  <td key={"actions"}>
                    <span
                      className="table_text"
                      onClick={() => callback("detail", item._id)}
                    >
                      <Detailicon />{" "}
                      {id === "provider" ? "View Ratings" : "View Details"}
                    </span>
                  </td>
                ) : (
                  <>
                    {id != "cancel" && (
                      <td key={"actions"}>
                        <EditIcon
                          style={{ marginRight: "5px" }}
                          onClick={() => callback("edit", item._id)}
                        />
                        <DeleteIcon
                          onClick={() => callback("delete", item._id)}
                        />
                      </td>
                    )}
                  </>
                )}
              </>
            </tr>
          ))}
        </tbody>
      </table>
      {isPaginationShow && (
        <div className="pagination">
          <>
            <button onClick={() => onPageChange(currentPage - 1)}>
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={index + 1 === currentPage ? "active" : ""}
                onClick={() => onPageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
          </>
        </div>
      )}
    </>
  );
};
