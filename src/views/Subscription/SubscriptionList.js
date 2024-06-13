import "react-data-table-component-extensions/dist/index.css";

// A super simple expandable component.
import "../UserManagement/style.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Header from "views/UserManagement/TableHeader";
import Skeleton from "react-loading-skeleton";
import { subscriptionList } from "Apis/NewSubscription";
import { useEffect, useState } from "react";
import { TableWithPagination } from "views/UserManagement/Table";

function SubscriptionList() {
  const history = useHistory();
  const [subscritions, setSubscription] = useState("");
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState("");

  const fetchTotalCount = async (page) => {
    try {
      // const data = await userList();
      const data = await subscriptionList(page);
      setSubscription(data.data?.users);
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
  const handleClick = (title) => {};

  return (
    // <div className="main">
    // <DataTableExtensions export={false} print={false} {...tableData}>
    <>
      <Header
        hideButton
        btntext={"Add Account"}
        title={"New Subscriptions"}
        onAddAccount={() => history.push("/admin/customermanagement")}
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
          data={subscritions}
          totalPages={pagination.pages}
          currentPage={pagination.page}
          onPageChange={""}
          callback={""}
          id={"subscription"}
          isPaginationShow={pagination.pages > 1 && true}
        />
      )}
    </>

    //  </DataTableExtensions>
    // </div>
  );
}
export default SubscriptionList;
