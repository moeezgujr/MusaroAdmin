import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";

// A super simple expandable component.
import "../UserManagement/style.css";
// import { ReactComponent as Detailicon } from "../../assets/img/detailicon.svg";
import { useEffect, useState } from "react";
import { customerList } from "Apis/Customer";
import { TableWithPagination } from "views/UserManagement/Table";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Header from "views/UserManagement/TableHeader";
import { useHistory } from "react-router";
import { searchList } from "Apis/Customer";

function CustomerList() {
  const [customer, setCustomer] = useState("");
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState("");

  const fetchTotalCount = async (page) => {
    try {
      // const data = await userList();
      const data = await customerList(page);
      setCustomer(data.data?.customers);
      setPagination(data.data.meta);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  const search = async (text) => {
    try {
      // const data = await userList();
      const data = await searchList(text);
      setCustomer(data.data?.customers);
      setPagination(data.data.meta);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalCount(0);
  }, []);

  const column = [
    {
      value: "name",
      label: "Name",
    },
    {
      value: "city",
      label: "City",
    },
    {
      value: "mobile",
      label: "Mobile",
    },
    {
      value: "createdAt",
      label: "Created On",
    },
  ];
  const history = useHistory();
  const callback = (e) => {
    if (e.target.value) search(e.target.value);
    else fetchTotalCount(0);
  };
  return (
    // <div className="main">
    // <DataTableExtensions export={false} print={false} {...tableData}>
    <>
      <Header
        hideButton
        btntext={"Add Account"}
        title={"Customer Management"}
        onAddAccount={() => history.push("/admin/customermanagement")}
        onSearch={callback}
      />

      {loading ? (
        <div id="customers" style={{ border: "none" }}>
          <Skeleton height={40} count={5} style={{ marginBottom: 10 }} />
          <Skeleton
            height={40}
            count={1}
            style={{ marginBottom: 10, width: "50%" }}
          />
        </div>
      ) : (
        <TableWithPagination
          headers={column}
          data={customer}
          totalPages={pagination.pages}
          currentPage={pagination.page}
          onPageChange={""}
          callback={""}
          id={"customer"}
          isPaginationShow={pagination.pages > 1 && true}
        />
      )}
    </>

    //  </DataTableExtensions>
    // </div>
  );
}
export default CustomerList;
