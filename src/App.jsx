import "./App.css";
import Layout from "./Components/Layout/Layout";
import LoginPage from "./Components/LoginPage/LoginPage";
import SignupPage from "./Components/SignupPage/SignupPage";
import Dashboard from "./Components/Dashboard/Dashboard";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import Home from "./Components/Home/Home";
import Shop from "./Components/Shop/Shop";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import Blog from "./Components/Blog/Blog";
import Cart from "./Components/Cart/Cart";
import Products from "./Components/Products/Products";
import Orders from "./Components/Orders/Orders";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectRouter from "./Components/Layout/ProtectRouter";
import Profile from "./Components/Profile/Profile";
import Likes from "./Components/Likes/Likes";
function App() {
  let router = createBrowserRouter([
    {
      path: "signup",
      element: (
        <ProtectRouter>
          <SignupPage />
        </ProtectRouter>
      ),
    },
    {
      path: "login",
      element: (
        <ProtectRouter>
          <LoginPage />
        </ProtectRouter>
      ),
    },
    {
      path: "forget-password",
      element: (
        <ProtectRouter>
          <ForgetPassword />
        </ProtectRouter>
      ),
    },
    {
      path: "/",
      element: (
        <ProtectRouter>
          <Layout />
        </ProtectRouter>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "shop",
          element: <Shop />,
        },
        {
          path: "blog",
          element: <Blog />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "wishlist",
          element: (
            <ProtectRouter>
              <Likes />
            </ProtectRouter>
          ),
        },
      ],
    },
    {
      path: "adminstrator",
      element: <ProtectRouter></ProtectRouter>,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "orders",
          element: <Orders />,
        },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
