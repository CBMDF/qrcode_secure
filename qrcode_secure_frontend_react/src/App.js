import React from "react";
import Scan from "./Scan";
import "./App.css";
import theme from "./theme";
import { ThemeProvider } from "@material-ui/styles";
import "./assets/scss/index.scss";
const App = () => (
  <ThemeProvider theme={theme}>
    <Scan />
  </ThemeProvider>
);

export default App;
