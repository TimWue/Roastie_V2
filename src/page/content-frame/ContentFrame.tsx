import * as React from "react";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Dashboard } from "../dashboard/Dashboard";
import { SettingsManagement } from "../settings/SettingsManagement";
import { ArchiveTable } from "../archive/ArchiveTable";
import { toolbarHeight, TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";
import { Alert, Button } from "@mui/material";
import { MeasurementContext } from "../../infrastructure/MeasurementContext";
import { settingsRepository } from "../../domain/settings/SettingsRepository";
import Grid from "@mui/material/Grid";

export const drawerWidth: number = 240;

const mdTheme = createTheme({
  palette: {
    primary: {
      main: "#2596be",
    },
    secondary: {
      main: "#edf2ff",
    },
  },
});

export const ContentFrame: FunctionComponent = () => {
  const [open, setOpen] = React.useState(false);
  const [subscriptionError, setSubscriptionError] = useState(false);
  const navigate = useNavigate();
  const heightContent = window.innerHeight - toolbarHeight;

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { subscribeToMeasurements, unsubscribeFromMeasurements } =
    useContext(MeasurementContext);

  useEffect(() => {
    settingsRepository.getSettings().then((settings) => {
      const topicNames = settings.mqtt.topicNames;
      const host = settings.mqtt.host;
      try {
        subscribeToMeasurements(host, topicNames);
        setSubscriptionError(false);
      } catch (e) {
        console.log(e);
        setSubscriptionError(true);
      }
    });
    return unsubscribeFromMeasurements();
  }, []);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <TopBar open={open} toggleDrawer={toggleDrawer} />
        <Sidebar open={open} toggleDrawer={toggleDrawer} />
        <Box component="main">
          <Toolbar />
          {subscriptionError && (
            <Alert
              severity="info"
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => {
                    navigate("/settings");
                    setSubscriptionError(false);
                  }}
                >
                  Zu den Einstellungen
                </Button>
              }
            >
              Die Verbindung zum MQTT-Broker ist fehlgeschlagen.
            </Alert>
          )}
          <Grid
            container
            width={"100%"}
            height={`${heightContent}px`}
            overflow={"auto"}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/archive" element={<ArchiveTable />} />
              <Route path="/settings" element={<SettingsManagement />} />
            </Routes>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
