import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Revenue.css";
import { TableWithPagination } from "views/UserManagement/Table";
import { cancelledSubscriptionsList } from "Apis/Revenue";

const TicketTable = ({ tab }) => {
  const cancelledSubscriptionsheader = [
    { label: "Ticket ID", value: "idNumber" },
    { label: "Name", value: "name" },
    { label: "Reason", value: "reason" },
    { label: "Canceled Status", value: "updatedAt" },
  ];
  const activeSubscriptionsheader = [
    { label: "Ticket ID", value: "idNumber" },
    { label: "Name", value: "name" },
    { label: "Mobile", value: "mobile" },
    { label: "Type of Subscription", value: "type" },
    { label: "Created On", value: "createdAt" },
  ];
  function getTimeDifference(dateString) {
    // Parse the given date-time string to a Date object
    const givenDate = new Date(dateString);

    // Get the current time as a Date object
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const diffInMs = currentDate - givenDate;

    // Convert the difference to a more human-readable format
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);

    // Determine the appropriate return value
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else {
      const hours = diffInHours;
      const minutes = diffInMinutes % 60;
      return `${hours} hours and ${minutes} minutes ago`;
    }
  }

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState("");

  const [loading, setLoading] = useState(true);

  const fetchSubscription = async (page, status) => {
    setLoading(true);
    const data = await cancelledSubscriptionsList(page, status);
    setData(
      data.data.users.map((item) => {
        return {
          ...item,
          type: item.serviceDetail.type ? item.serviceDetail.type : "",
          reason: item?.metadata?.reason,
          canceled: "true",
          idNumber: item?.serviceDetail?.idNumber
            ? item.serviceDetail.idNumber
            : "",
          updatedAt: getTimeDifference(item?.updatedAt) || "2 Min ago",
        };
      })
    );
    setPagination(data.data.meta);
    setLoading(false);
  };

  useEffect(() => {
    if (tab === 2) fetchSubscription(0, "CANCELLED");
    else fetchSubscription(0, "ACTIVE");
  }, [tab]);

  const renderSkeleton = () => (
    <div>
      {Array(5)
        .fill()
        .map((_, index) => (
          <Skeleton
            key={index}
            width={1200}
            height={30}
            style={{ marginBottom: 10, marginLeft: 20 }}
          />
        ))}
    </div>
  );
  const paginationCallback = (val) => {
    let status = "";
    if (tab == 2) {
      status = "CANCELLED";
    } else {
      status = "ACTIVE";
    }
    fetchSubscription(val - 1, status);
  };
  return (
    <>
      {loading ? (
        <div>{renderSkeleton()}</div>
      ) : (
        <TableWithPagination
          headers={
            tab === 2 ? cancelledSubscriptionsheader : activeSubscriptionsheader
          }
          data={data}
          id="cancel"
          onPageChange={paginationCallback}
          totalPages={pagination.pages}
          currentPage={pagination.page}
          isPaginationShow={pagination.pages > 1 && true}
        />
      )}
    </>
  );
};

export default TicketTable;
