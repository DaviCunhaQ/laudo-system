import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RoutePages } from "./router";
import "./index.css";

const queryClient = new QueryClient(); // Criando a instância do QueryClient

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RoutePages />
  </QueryClientProvider>
);
