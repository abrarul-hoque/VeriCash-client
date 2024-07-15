import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import MainRoot from "./components/MainRoot/MainRoot";
import Home from "./components/Pages/Home/Home";
import Register from "./components/shared/Register/Register";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainRoot></MainRoot>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
        ]
    },
]);

export default routes;