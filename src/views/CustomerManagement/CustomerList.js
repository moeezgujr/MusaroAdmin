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
import NoAccountsFound from "views/UserManagement/NoDataFound";
import CustomerSlider from "components/Slider/CustomerDetailSlider";

function CustomerList({ search }) {
  
  const [customer, setCustomer] = useState("");
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState("");
  const [customerid, setCustomerId] = useState("");
  const [slideropen, setSliderOpen] = useState(false);

  const fetchTotalCount = async (page) => {
    setLoading(true);
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
  useEffect(() => {
    if (search) searchText(search);
    else fetchTotalCount(0);
  }, [search]);
  const searchText = async (text) => {
    setLoading(true);
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
  const callback = () => {
    setSliderOpen(false);
    fetchTotalCount(0);
  };
  const onpagechange = (id) => {
    if(id>0){
      fetchTotalCount(id-1);
    }
  };
  return (
    // <div className="main">
    // <DataTableExtensions export={false} print={false} {...tableData}>
    <>
      {" "}
      <CustomerSlider
        callback={callback}
        open={slideropen}
        id={customerid}
        data={customer}
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
        <>
          {customer.length > 0 ? (
            <TableWithPagination
              headers={column}
              data={customer}
              totalPages={pagination.pages}
              currentPage={pagination.page}
              onPageChange={onpagechange}
              callback={(type, id) => {
                setSliderOpen(true);
                setCustomerId(id);
              }}
              id={"customer"}
              isPaginationShow={pagination.pages > 1 && true}
            />
          ) : (
            <NoAccountsFound />
          )}
        </>
      )}
    </>

    //  </DataTableExtensions>
    // </div>
  );
}
export default CustomerList;
