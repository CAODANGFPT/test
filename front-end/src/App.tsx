import "./App.css";

import { Route, Routes } from "react-router-dom";

import { ForgotPassword, Login, Register } from "@/page/Base/Account/index";

import AdminLayout from "./components/Layout/Admin";
import LayoutBase from "./components/Layout/Base";
import Dashboard from "./page/Admin/dashboard";
import AddProduct from "./page/Admin/Products/Add";
import EditProduct from "./page/Admin/Products/Edit";
import ListProducts from "./page/Admin/Products/List";
import AboutUs from "./page/Base/AboutUs";
import ResetPassword from "./page/Base/Account/ResetPassword";
import CartPage from "./page/Base/Cart";
import Contact from "./page/Base/Contact";
import DetailNewsPage from "./page/Base/DetailNews";
import HomePage from "./page/Base/Home";
import NewsPage from "./page/Base/News";
import ProductPage from "./page/Base/Product";
import PageNotFound from "./page/PageNotFound";
import ProductDetailPage from "./page/Base/ProductDetail";
import ListCategories from "./page/Admin/Categories/List";
import CategoryAdd from "./page/Admin/Categories/Add";
import AccountPage from "./page/Base/Account/Account";
import EditCategory from "./page/Admin/Categories/Edit";
import ListNews from "./page/Admin/News/List";
import NewsAdd from "./page/Admin/News/Add";
import NewsEdit from "./page/Admin/News/Edit";
import ListUser from "./page/Admin/User/List";
import UpdateUser from "./page/Admin/User/Edit";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutBase />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="register" element={<Register />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="productsCategory/:id" element={<ProductPage />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="news/:id" element={<DetailNewsPage />} />
        <Route path="login" element={<Login />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="contact" element={<Contact />} />
        <Route path="aboutUs" element={<AboutUs />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="resetPassword" element={<ResetPassword />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<ListProducts />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/:id/edit" element={<EditProduct />} />
        <Route path="news" element={<ListNews />} />
        <Route path="news/add" element={<NewsAdd />} />
        <Route path="news/:id/edit" element={<NewsEdit />} />
        <Route path="categories" element={<ListCategories />} />
        <Route path="categories/add" element={<CategoryAdd />} />
        <Route path="categories/:id/edit" element={<EditCategory />} />
        <Route path="user" element={<ListUser />} />
        <Route path="user/:id/edit" element={<UpdateUser />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
