import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { lightMode } from "./theme";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={lightMode}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
