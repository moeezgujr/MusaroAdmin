import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

// A super simple expandable component.
import "./style.css";
import Header from "./TableHeader";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SupportList() {
  const handleClick = (title) => {
    console.log(`You clicked me! ${title}`);
  };
  const columns = [
    {
      name: "Ticket ID",
      selector: (row) => row.ticket,
      cell: (d) => [ 1
        // <div className="status-workshop-container">
         
        // </div>,
      ]
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Cancellation Reason",
      selector: (row) => row.role,
      cell: (d) => [
        'Reason for cancellation will go here',
      ]
    },
    {
      name: "Cancelled",
      selector: (row) => row.role,
      cell: (d) => [
        <div className="status-workshop-container">
        <span className="status-workshop">2 min ago</span>
      </div>,,
      ]
    },
  ];

  const data = [
    {
      id: 1,
      name: "John Doe",
      email: "john_doe123@gmail.com",
      role: "Admin",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane_smith456@yahoo.com",
      role: "User",
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael123@hotmail.com",
      role: "Moderator",
    },
    {
      id: 4,
      name: "Emily Williams",
      email: "emily_williams789@outlook.com",
      role: "Admin",
    },
    {
      id: 5,
      name: "James Brown",
      email: "james_brown234@gmail.com",
      role: "User",
    },
    {
      id: 6,
      name: "Emma Davis",
      email: "emma_davis567@yahoo.com",
      role: "Moderator",
    },

  ];

  return (
    // <div className="main">
    // <DataTableExtensions export={false} print={false} {...tableData}>
    <>
      <DataTable
        columns={columns}
        data={data}
        // noHeader
        defaultSortField="id"
        // sortIcon={<SortIcon />}
        defaultSortAsc={true}
        pagination
        highlightOnHover
      />
    </>

    //  </DataTableExtensions>
    // </div>
  );
}
export default SupportList;
