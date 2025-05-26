import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import AdminLogin from "./AdminLogin";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin-session");
    if (isAdmin === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  return isAuthenticated ? (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-content">{children}</main>
    </div>
  ) : (
    <AdminLogin onSuccess={() => setIsAuthenticated(true)} />
  );
};

export default Layout;
