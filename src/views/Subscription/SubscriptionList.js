import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";

// A super simple expandable component.
import "../UserManagement/style.css";
import { ReactComponent as Detailicon } from "../../assets/img/detailicon.svg"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function SubscriptionList() {
  const history =useHistory()

  const handleClick = (title) => {
  };
  const columns = [
    {
      name: "Business Name",
      selector: (row) => row.name,
    },
    {
      name: "City",
      selector: (row) => row.email,
    },
  
    {
      name: "Contact Mobile Number",
      selector: (row) => row.createdon,
    },
    {
      name: "Created On",
      selector: (row) => row.createdon,
      cell: (d) => [
        12/11/2222
      ],
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (d) => [
        <div className="status-workshop-container">
          <span className="status-workshop">Pending</span>
        </div>,
      ],
    },
    {
      name: "Action",
      selector: (row) => row.action,
      cell: (d) => [
        <div className="" onClick={()=>history.push('/admin/subscriptionsdetails')}>
        <span className=""><Detailicon/>  View Details</span>
      </div>,
      ],
    },
  ];

  const data = [
    {
      id: 1,
      name: "John Doe",
      email: "john_doe123@gmail.com",
      role: "Admin",
      createdon: "DD/MM/YYY",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane_smith456@yahoo.com",
      role: "User",
      createdon: "DD/MM/YYY",
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael123@hotmail.com",
      role: "Moderator",
      createdon: "DD/MM/YYY",
    },
    {
      id: 4,
      name: "Emily Williams",
      email: "emily_williams789@outlook.com",
      role: "Admin",
      createdon: "DD/MM/YYY",
    },
    {
      id: 5,
      name: "James Brown",
      email: "james_brown234@gmail.com",
      role: "User",
      createdon: "DD/MM/YYY",
    },
    {
      id: 6,
      name: "Emma Davis",
      email: "emma_davis567@yahoo.com",
      role: "Moderator",
      createdon: "DD/MM/YYY",
    },
    {
      id: 7,
      name: "Matthew Wilson",
      email: "matthew789@hotmail.com",
      role: "Admin",
      createdon: "DD/MM/YYY",
    },
    {
      id: 8,
      name: "Olivia Taylor",
      email: "olivia_taylor123@outlook.com",
      role: "User",
      createdon: "DD/MM/YYY",
    },
    {
      id: 9,
      name: "Daniel Martinez",
      email: "daniel_martinez456@gmail.com",
      role: "Moderator",
      createdon: "DD/MM/YYY",
    },
    {
      id: 10,
      name: "Sophia Anderson",
      email: "sophia_anderson789@yahoo.com",
      role: "Admin",
      createdon: "DD/MM/YYY",
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
export default SubscriptionList;