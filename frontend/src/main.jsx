import React from 'react'

import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom"



import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Root from "./pages/root/root.jsx";
import ErrorPage from './pages/404/404.jsx';
import MessagesPage from "./pages/messages/messages";
import ChatArea from "./blocks/ChatArea/ChatArea";
import Welcome from "./pages/welcome/welcome.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Welcome />,
        errorElement: <ErrorPage />,
    },
    {
        path: "auth",
        element: <Root isLogined={false}/>,
        errorElement: <ErrorPage />,
    },
    {
        path: "reg",
        element: <Root isLogined={true}/>,
        errorElement: <ErrorPage />,
    },
    {
        path: "messages",
        element: <MessagesPage/>,
        // loader: chatLoader,
        errorElement: <ErrorPage />,
        children: [
            {
                path: ":userId",
                element: <ChatArea />,
                errorElement: <ErrorPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
)
