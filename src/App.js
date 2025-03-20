import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./component/main/navbar";
import Sidebar from "./component/main/sidebar";
import Dashboard from "./component/main/dashboard/dashboard";
import MenuManagement from "./component/main/MenuManagement/MenuManagement";
import { SidebarProvider, useSidebar } from "./component/main/SidebarContext";
import { MenuProvider } from "./component/main/MenuManagement/MenuContext";
import ColorImplementation from "./component/main/ColorImplementation/ColorImplementation";
import { ColorProvider } from "./component/main/ColorImplementation/ColorContext";

const Layout = () => {
  const { checked } = useSidebar();
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ColorProvider>
        <Navbar />
        <Sidebar />
        <div style={{ flex: 1 }} className={`pt-[66px] bg-gray-50 ${checked ? "md:pl-[240px]" : "md:pl-[78px]"}`}>
          <MenuProvider>
            <Routes>
              <Route path="/menumanagement" element={<MenuManagement />} />
              <Route path="/colorimplementation" element={<ColorImplementation />} />
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </MenuProvider>
        </div>
      </ColorProvider>
    </div>
  );
};

function App() {
  return (
    <SidebarProvider>
      <Router>
        <Layout />
      </Router>
    </SidebarProvider>
  );
}

export default App;
