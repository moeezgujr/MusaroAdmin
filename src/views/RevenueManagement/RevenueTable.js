import React from "react";
import "./Revenue.css";
import { TableWithPagination } from "views/UserManagement/Table";

const TicketTable = ({ tab }) => {
  const cancelledSubscriptionsheader = [
    { label: "Name", value: "name" },
    { label: "Email", value: "email" },
    { label: "Reason", value: "reason" },
    { label: "Canceled Status", value: "canceled" },
  ];
  const cancelledSubscriptions = [
    {
      id: "001",
      name: "John Doe",
      email: "john@example.com",
      reason: "Change of plans",
      canceled: "true",
    },
    {
      id: "002",
      name: "Jane Smith",
      email: "jane@example.com",
      reason: "Double booking",
      canceled: "true",
    },
    {
      id: "003",
      name: "Alex Johnson",
      email: "alex@example.com",
      reason: "Flight delay",
      canceled: "true",
    },
    {
      id: "004",
      name: "Emily Brown",
      email: "emily@example.com",
      reason: "Personal reasons",
      canceled: "true",
    },
  ];
  const activeSubscriptionsheader = [
    { label: "Name", value: "name" },
    { label: "Mobile", value: "mobile" },
    { label: "Type of Subscription", value: "type" },
    { label: "Created On", value: "createdAt" },
  ];
  const activeSubscriptions = [
    {
      id: "001",
      name: "John Doe",
      mobile: "03154887994",
      type: "Annual",
      createdAt: "22/22/2012",
    },
    {
      id: "001",
      name: "John Doe",
      mobile: "03154887994",
      type: "Annual",
      createdAt: "22/22/2012",
    },
    {
      id: "001",
      name: "John Doe",
      mobile: "03154887994",
      type: "Annual",
      createdAt: "22/22/2012",
    },
    {
      id: "001",
      name: "John Doe",
      mobile: "03154887994",
      type: "Annual",
      createdAt: "22/22/2012",
    },
  ];

  return (
    <TableWithPagination
      headers={
        tab == 2 ? cancelledSubscriptionsheader : activeSubscriptionsheader
      }
      data={tab == 2 ? cancelledSubscriptions : activeSubscriptions}
      id="cancel"
    />
  );
};

export default TicketTable;
