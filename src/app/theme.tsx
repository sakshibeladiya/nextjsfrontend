












import { RefineThemes } from "@refinedev/mui";
import { createTheme } from "@mui/material/styles";

export const overriddenLightTheme = createTheme({
  ...RefineThemes.Blue,
  palette: {
    ...RefineThemes.Blue.palette,
    primary: {
      // main: "#5508d1",
      main: '#19105f'
    },
    secondary: {
      main: "#2f82f1",
    },
  },
});
export const overriddenDarkTheme = createTheme({
  ...RefineThemes.BlueDark,
  palette: {
    ...RefineThemes.BlueDark.palette,
    primary: {
      main: "#5508d1",
    },
    secondary: {
      main: "#2f82f1",
    },
  },
});