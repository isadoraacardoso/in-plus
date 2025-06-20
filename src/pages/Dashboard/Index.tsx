
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import DashboardPCD from "./DashboardPCD";
import DashboardEmpresa from "./DashboardEmpresa";

const Dashboard = () => {
  const { user, userType, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return userType === "empresa" ? <DashboardEmpresa /> : <DashboardPCD />;
};

export default Dashboard;
