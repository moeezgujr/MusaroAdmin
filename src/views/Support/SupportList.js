import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

// A super simple expandable component.
import "./style.css";
import Header from "./TableHeader";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { TableWithPagination } from "views/UserManagement/Table";

function SupportList() {
  const handleClick = (title) => {
    console.log(`You clicked me! ${title}`);
  };
  const columns = [
    {
      label: "Ticket ID",
      value: "id",
    },
    {
      label: "Name",
      value: "name",
    },
    {
      label: "Email",
      value: "email",
    },
    {
      label: "Role",
      value: "role",
    },
    {
      label: "Cancellation Reason",
      value: "reason",
    },
    {
      label: "Cancelled",
      value: "cancelled",
    },
  ];

  const data = [
    {
      id: 1,
      name: "John Doe",
      email: "john_doe123@gmail.com",
      role: "Admin",
      reason:'Reason of cancellattion',
      cancelled:'2 min ago',
    },
    {
      id: 2,
      name: "Jane Smith",
      reason:'Reason of cancellattion',
      cancelled:'2 min ago',
      email: "jane_smith456@yahoo.com",
      role: "User",
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael123@hotmail.com",
      reason:'Reason of cancellattion',
      cancelled:'2 min ago',
      role: "Moderator",
    },
    {
      id: 4,
      name: "Emily Williams",
      email: "emily_williams789@outlook.com",
      reason:'Reason of cancellattion',
      cancelled:'2 min ago',
      role: "Admin",
    },
    {
      id: 5,
      name: "James Brown",
      email: "james_brown234@gmail.com",
      reason:'Reason of cancellattion',
      cancelled:'2 min ago',
      role: "User",
    },
    {
      id: 6,
      name: "Emma Davis",
      email: "emma_davis567@yahoo.com",
      reason:'Reason of cancellattion',
      cancelled:'2 min ago',
      role: "Moderator",
    },
  ];

  return (
    // <div className="main">
    // <DataTableExtensions export={false} print={false} {...tableData}>
    <>
      <TableWithPagination
        headers={columns}
        data={data}
        id="cancel"
        // noHeader
      />
    </>

    //  </DataTableExtensions>
    // </div>
  );
}
export default SupportList;
