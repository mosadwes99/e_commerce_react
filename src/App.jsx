import "./App.css";
import Layout from "./Components/Layout/Layout";
import LoginPage from "./Components/LoginPage/LoginPage";
import SignupPage from "./Components/SignupPage/SignupPage";
import Dashboard from "./Components/Admin/Dashboard/Dashboard";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import Home from "./Components/User/Home/Home";
import Shop from "./Components/User/Shop/Shop";
import About from "./Components/User/About/About";
import Contact from "./Components/User/Contact/Contact";
import Blog from "./Components/User/Blog/Blog";
import Cart from "./Components/User/Cart/Cart";
import Products from "./Components/Admin/Products/Products";
import Orders from "./Components/Admin/Orders/Orders";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectRouter from "./Components/Layout/ProtectRouter";
import Profile from "./Components/UserProfile/Profile/Profile";
import Likes from "./Components/UserProfile/Likes/Likes";
import AdminstratorLayout from "./Components/Layout/AdminstratorLayout";
import ProductDetails from "./Components/User/Shop/ProductDetails";
import BlogDetails from "./Components/User/Blog/BlogDetails";
import UserProfile from "./Components/Layout/UserProfile";
import UserOrder from "./Components/UserProfile/UserOrder/UserOrder.jsx"
import Address from "./Components/UserProfile/Address/Address.jsx"
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
          path: "productdetails/:uid",
          element: <ProductDetails />,
        },
        {
          path: "blogdetails/:uid",
          element: <BlogDetails />,
        },
        {
          path: "profile",
          element: <UserProfile />,
          children: [
            {
              index: true,
              element: <Profile />,
            },
            {
              path: "wishlist",
              element: <Likes />,
            },
            {
              path: "orders",
              element: <UserOrder/>,
            },
            {
              path: "adress",
              element: <Address />,
            },
          ],
        },
      ],
    },
    {
      path: "adminstrator",
      element: (
        <ProtectRouter>
          <AdminstratorLayout />
        </ProtectRouter>
      ),
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
