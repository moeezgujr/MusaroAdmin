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
  function formatDateWithMonthName(isoDateString) {
    const date = new Date(isoDateString);

    // Extract day and year
    const day = String(date.getUTCDate()).padStart(2, "0");
    const year = date.getUTCFullYear();

    // Get month names array
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Get the correct month name
    const month = monthNames[date.getUTCMonth()]; // Months are zero-indexed

    // Return the formatted date as DD-MMM-YYYY
    return `${day}-${month}-${year}`;
  }
  const renderCell = (value, label) => {
    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value);
    }
    if (label === "createdAt") {
      return formatDateWithMonthName(value);
    }
    if (!value) {
      value = "Not available";
    }
    return value;
  };

  function capitalizeFirstLetterOnly(str) {
    try {
      return str
        ?.split(" ")
        ?.map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        ?.join(" ");
    } catch {
      return str;
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
                      className={`
                        ${header.label == "Role" && "role_td"} ${
                        header.label === "Status" && "subsrctiption_status"
                      } ${header.value === "createdAt"? 'ltr':''}
                         table_text`}
                      style={{ marginTop: "10px", marginBottom: "10px" }}
                    >
                      {" "}
                      {header.value === "createdAt"
                        ? renderCell(item[header.value], header.value)
                        : capitalizeFirstLetterOnly(
                            renderCell(item[header.value], header.value)
                          )}
                    </p>
                  </td>
                ))}
                {id === "workshop" ||
                id === "customer" ||
                id === "provider" ||
                id === "subscription" ? (
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
