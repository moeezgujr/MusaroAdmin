import React from 'react';
import './Revenue.css';

const TicketTable = () => {
  const tickets = [
    { id: '001', name: 'John Doe', email: 'john@example.com', reason: 'Change of plans', canceled: true },
    { id: '002', name: 'Jane Smith', email: 'jane@example.com', reason: 'Double booking', canceled: true },
    { id: '003', name: 'Alex Johnson', email: 'alex@example.com', reason: 'Flight delay', canceled: true },
    { id: '004', name: 'Emily Brown', email: 'emily@example.com', reason: 'Personal reasons', canceled: false }
  ];

  return (
    <table className="ticket-table mr-3 ml-3">
      <thead>
        <tr>
          <th>Ticket ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Cancellation Reason</th>
          <th>Canceled Status</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map(ticket => (
          <tr key={ticket.id}>
            <td>{ticket.id}</td>
            <td>{ticket.name}</td>
            <td>{ticket.email}</td>
            <td>{ticket.reason}</td>
            <td>{ticket.canceled ? 'Yes' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TicketTable;
