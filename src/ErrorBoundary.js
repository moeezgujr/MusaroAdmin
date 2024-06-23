import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ErrorBoundaryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const ErrorMessage = styled.h1`
  color: #ff6347; /* Tomato color */
  font-size: 24px;
`;

const RefreshButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff; /* Blue */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3; /* Darker blue on hover */
  }
`;

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error, errorInfo) => {
      console.error("Error caught by ErrorBoundary:", error, errorInfo);
      setHasError(true);
    };

    // Setup error handler
    window.addEventListener("error", errorHandler);

    // Cleanup
    return () => {
      window.removeEventListener("error", errorHandler);
    };
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  if (hasError) {
    return (
      <ErrorBoundaryContainer>
        <ErrorMessage>Something went wrong.</ErrorMessage>
        <RefreshButton onClick={handleRefresh}>Refresh</RefreshButton>
      </ErrorBoundaryContainer>
    );
  }

  return children;
};

export default ErrorBoundary;
