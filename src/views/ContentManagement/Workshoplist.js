import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";
import Skeleton from "react-loading-skeleton";

import "../UserManagement/style.css";
import { TableWithPagination } from "views/UserManagement/Table";
import { getWorkshopList } from "Apis/Workshop";
import { useHistory } from "react-router";

function WorkshopsList() {
  const [workshop, setWorkshop] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [loading, setLoading] = useState(true);
  const handleClick = (title) => {
    console.log(`You clicked me! ${title}`);
  };

  const fetchWorkshops = async (page) => {
    const data = await getWorkshopList(page);
    const list = data.data.workshops.map((item) => {
      return {
        ...item,
        mobile: item?.owner?.mobile,
        name: item?.owner?.name,
      };
    });

    setWorkshop(list);
    setPagination(data.data.meta);
    setLoading(false);
  };

  useEffect(() => {
    fetchWorkshops(0);
  }, []);

  const columns = [
    { label: "Name of Workshop", value: "workshopName" },
    { label: "Name of Workshop", value: "name" },
    { label: "Contact Mobile Number", value: "mobile" },
    { label: "Ceated on", value: "createdAt" },
    { label: "Status", value: "status" },
  ];
  const history = useHistory();
  const callback = (type, id) => {
    history.push("/admin/addworkshop/" + id);
  };
  const onPageChange = (page) => {
    if (page > 0) {
      fetchWorkshops(page - 1);
    }
  };
  return (
    <>
      {loading ? (
        <div style={{ border: "none" }}>
          <Skeleton height={40} count={5} style={{ marginBottom: 10 }} />
          <Skeleton
            height={40}
            count={1}
            style={{ marginBottom: 10, width: "50%" }}
          />
        </div>
      ) : (
        <TableWithPagination
          id={"workshop"}
          headers={columns}
          data={workshop}
          callback={callback}
          currentPage={pagination.page}
          totalPages={pagination.pages}
          isPaginationShow={pagination.pages > 1 && true}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
}

export default WorkshopsList;
