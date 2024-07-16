import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { Layout, HomePage, ListPage, SinglePage,ProfilePage } from "./Pages";

function App() {
  const router = createBrowserRouter([{
    path: "/",
    element: <Layout />,

    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/list",
        element: <ListPage />
      },
      {
        path: "/:id",
        element: <SinglePage />
      },
      {
        path:"/Profile",
        element:<ProfilePage/>
      }
    ]
  }]);
  return (


    <RouterProvider router={router} />
  )
}

export default App