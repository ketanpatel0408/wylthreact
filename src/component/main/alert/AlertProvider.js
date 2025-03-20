import React, { useEffect, useState, createContext, useContext } from "react";
import { Alert, AlertTitle, Snackbar } from "@mui/material";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ message: "", severity: "", open: false });

  useEffect(() => {
    if (alert.open) {
      const timer = setTimeout(() => {
        setAlert((prev) => ({ ...prev, open: false }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert.open]);

  const showAlert = (message, severity) => {
    if (severity !== "success" && severity !== "error") return;
    setAlert({ message, severity, open: true });
  };

  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      <Snackbar
        open={alert.open}
        autoHideDuration={5000}
        onClose={() => setAlert((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        className="!z-[9999] max-w-[450px]"
      >
        <Alert
          variant="filled"
          severity={alert.severity}
          onClose={() => setAlert((prev) => ({ ...prev, open: false }))}
          className="mb-2"
          sx={{
            backgroundColor: alert.severity === "error" ? "#D32F2F" : "#388E3C",
            color: "#fff",
          }}
        >
          <AlertTitle>{alert.severity === "error" ? "Error" : "Success"}</AlertTitle>
          {alert.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

export default AlertProvider;