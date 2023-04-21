import { Refine} from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { RefineSnackbarProvider, notificationProvider } from "@refinedev/mui";

import { CssBaseline, GlobalStyles } from "@mui/material";
import routerBindings, {
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MuiInferencer } from "@refinedev/inferencer/mui";

import { ColorModeContextProvider } from "./contexts/color-mode";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
              resources={[
                  {
                      name: "blog_posts",
                      list: "/blog-posts",
                      show: "/blog-posts/show/:id",
                      create: "/blog-posts/create",
                      edit: "/blog-posts/edit/:id",
                  },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <Routes>
                  <Route
                      index
                      element={
                          <NavigateToResource resource="blog_posts" />
                      }
                  />
                  <Route path="blog-posts">
                      <Route index element={<MuiInferencer />} />
                      <Route
                          path="show/:id"
                          element={<MuiInferencer />}
                      />
                      <Route
                          path="edit/:id"
                          element={<MuiInferencer />}
                      />
                      <Route
                          path="create"
                          element={<MuiInferencer />}
                      />
                  </Route>

              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
