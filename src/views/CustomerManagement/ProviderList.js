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
import { getProviders } from "Apis/Customer";
import { searchProviders } from "Apis/Customer";
import NoAccountsFound from "views/UserManagement/NoDataFound";
import Slider from "components/Slider/ProviderRatings";
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
    value: "businessName",
    label: "Profile Name",
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
function ProviderList({ search }) {
  const [customer, setCustomer] = useState("");
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState("");
  const [slideropen, setSliderOpen] = useState(false);
  const [id, setProviderId] = useState(0);
  const fetchTotalCount = async (page) => {
    setLoading(true);
    try {
      // const data = await userList();
      const data = await getProviders(page);
      setCustomer(data.data?.providers);
      setPagination(data.data.meta);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  const searchText = async (text) => {
    setLoading(true);
    try {
      // const data = await userList();
      const data = await searchProviders(text);
      setCustomer(data.data?.providers);
      setPagination(data.data.meta);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalCount(0);
  }, []);
  useEffect(() => {
    if (search) searchText(search);
    else fetchTotalCount(0);
  }, [search]);

  const onpagechange = (id) => {
    if(id>0){
      fetchTotalCount(id-1);
    }
  };
  return (
    <>
      <Slider callback={setSliderOpen} open={slideropen} id={id} />
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
              callback={((type, id) => {setSliderOpen(true);setProviderId(id)})}
              id={"provider"}
              isPaginationShow={pagination.pages > 1 && true}
            />
          ) : (
            <NoAccountsFound />
          )}
        </>
      )}
    </>
  );
}
export default ProviderList;
