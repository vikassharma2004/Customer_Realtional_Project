import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Tabs,
  Tab,
  Checkbox,
  Divider,
  Stack,
} from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";
import LaunchIcon from "@mui/icons-material/Launch";
import ReviewsIcon from "@mui/icons-material/Reviews";
import WorkIcon from "@mui/icons-material/Work";
import { useState } from "react";

const apps = [
  { icon: <AppsIcon />, name: "Jira", sub: "jira-board-alok" },
  { icon: <ReviewsIcon />, name: "Confluence", sub: "jira-board-alok" },
  { icon: <SearchIcon />, name: "Search", sub: "jira-board-alok" },
  { icon: <LaunchIcon />, name: "Studio", sub: "jira-board-alok" },
  { icon: <ChatIcon />, name: "Chat", sub: "jira-board-alok" },
  { icon: <SettingsIcon />, name: "Administration", sub: "" },
];

const tasks = [
  {
    title: "responsiveness of login page",
    meta: "Jira · SCRUM-3 · CRM",
    date: "May 29",
  },
  {
    title: "Find out bugs",
    meta: "Jira · SCRUM-2 · CRM",
    date: "May 29",
  },
  {
    title: "Code Review Of CRM",
    meta: "Jira · SCRUM-1 · CRM",
    date: "May 29",
  },
];

export default function ForYou() {
  const [tab, setTab] = useState(0);

  return (
    <Box p={8}>
      {/* Greeting */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        G'day, Alok Kumawat
      </Typography>

      {/* Your Apps */}
      <Typography variant="h6" mt={4} mb={2}>
        Your apps
      </Typography>
      <Grid container spacing={2}>
        {apps.map((app, index) => (
          <Grid item xs={6} sm={4} md={2} key={index}>
            <Card variant="outlined" sx={{ textAlign: "center", p: 2 }}>
              <Avatar sx={{ bgcolor: "primary.main", mx: "auto", mb: 1 }}>
                {app.icon}
              </Avatar>
              <Typography variant="subtitle1">{app.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {app.sub}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Frequent Places */}
      <Typography variant="h6" mt={6} mb={2}>
        Frequent places
      </Typography>
      <Card variant="outlined" sx={{ width: 250, p: 2 }}>
        <Avatar sx={{ bgcolor: "#FFB300", mb: 1 }}>🖼️</Avatar>
        <Typography variant="subtitle1">CRM</Typography>
        <Typography variant="body2" color="primary">
          Project
        </Typography>
      </Card>

      {/* What's Next Section */}
      <Typography variant="h6" mt={6}>
        What’s next
      </Typography>
      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="Worked on" />
        <Tab label="Viewed" />
        <Tab label="Recommended" />
      </Tabs>

      <Stack spacing={2}>
        {tasks.map((task, index) => (
          <Card key={index} variant="outlined">
            <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box display="flex" alignItems="start" gap={2}>
                <Checkbox />
                <Box>
                  <Typography fontWeight="medium">{task.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {task.meta}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {task.date}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
