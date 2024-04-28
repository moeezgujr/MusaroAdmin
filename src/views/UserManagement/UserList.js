import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

// A super simple expandable component.
import "./style.css";
import Header from "./TableHeader";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function UserList() {
  const handleClick = (title) => {
    console.log(`You clicked me! ${title}`);
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      cell: (d) => [
        <div className="status-workshop-container">
          <span className="status-workshop">Admin</span>
        </div>,
      ]
    },
    {
      name: "Action",
      selector: (row) => row.action,
      cell: (d) => [
        <i
          key={d.title}
          onClick={handleClick(d.title)}
          className="first fas fa-pen"
        ></i>,
        <i onClick={handleClick(d.title)} className="fas fa-trash-alt"></i>,
      ],
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
    {
      id: 7,
      name: "Matthew Wilson",
      email: "matthew789@hotmail.com",
      role: "Admin",
    },
    {
      id: 8,
      name: "Olivia Taylor",
      email: "olivia_taylor123@outlook.com",
      role: "User",
    },
    {
      id: 9,
      name: "Daniel Martinez",
      email: "daniel_martinez456@gmail.com",
      role: "Moderator",
    },
    {
      id: 10,
      name: "Sophia Anderson",
      email: "sophia_anderson789@yahoo.com",
      role: "Admin",
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
export default UserList;
