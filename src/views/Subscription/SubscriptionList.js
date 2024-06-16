import "react-data-table-component-extensions/dist/index.css";

// A super simple expandable component.
import "../UserManagement/style.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Header from "views/UserManagement/TableHeader";
import Skeleton from "react-loading-skeleton";
import { subscriptionList } from "Apis/NewSubscription";
import { useEffect, useState } from "react";
import { TableWithPagination } from "views/UserManagement/Table";
import SubscriptionSlider from "components/Slider/SubscriptionSlider";

function SubscriptionList() {
  const history = useHistory();
  const [subscritions, setSubscription] = useState("");
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState("");
  const [slideropen, setSliderOpen] = useState(false);
  const [id, setID] = useState(0);
  const fetchTotalCount = async (page) => {
    try {
      // const data = await userList();
      const data = await subscriptionList(page);
      setSubscription(
        data.data?.users.map((e) => {
          return {
            ...e,
            status: "Pending",
          };
        })
      );
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
      setCustomer(
        data.data?.users.map((e) => {
          return {
            ...e,
            status: "Pending",
          };
        })
      );
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
      label: "Business Name",
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
    {
      value: "status",
      label: "Status",
    },
  ];
  const callback = (title) => {
    setSliderOpen(false)
  };

  return (
    // <div className="main">
    // <DataTableExtensions export={false} print={false} {...tableData}>
    <>
      <SubscriptionSlider
        callback={callback}
        open={slideropen}
        id={id}
        data={subscritions}
      />
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
          callback={(type, id) => {debugger
            setSliderOpen(true);
            setID(id);
          }}
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
