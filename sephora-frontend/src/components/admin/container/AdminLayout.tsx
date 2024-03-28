import { Outlet } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const AdminLayout = () => {
  return (
    <>
      <Container  sx={{ flexGrow: 1, p: 3 }}>
            <AdminHeader />
        <Grid container>
          <Grid  item md={3}>
            <AdminSidebar />
          </Grid>
          <Grid component="main" sx={{ flexGrow: 1, p: 3 }} item md={9}>
            <Outlet />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AdminLayout;