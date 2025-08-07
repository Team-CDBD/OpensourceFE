/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DashboardLayout from "layouts/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/Navbars/DashboardNavbar";
import Footer from "layouts/Footer";

function McpConfiguration() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* prettier-ignore */}
      <p style={{ whiteSpace: "pre-line" }}>
        Mcp 설정
      </p>
      <Footer />
    </DashboardLayout>
  );
}

export default McpConfiguration;
