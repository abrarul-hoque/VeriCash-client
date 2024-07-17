import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import MainRoot from "./components/MainRoot/MainRoot";
import Home from "./components/Pages/Home/Home";
import Register from "./components/shared/Register/Register";
import NotFound from "./components/Pages/NotFound/NotFound";
import Login from "./components/shared/Login/Login";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainRoot></MainRoot>,
        errorElement: <NotFound></NotFound>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
        ]
    },
]);

export default routes;