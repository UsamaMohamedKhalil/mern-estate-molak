import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListingPage from "./pages/UpdateListingPage";
import Listing from "./pages/Listing";
import Search from "./pages/Search";
import CreateRequest from "./pages/CreateRequest";
import Request from "./pages/Request";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/create-request" element={<CreateRequest />} />
        <Route path="/update-listing/:listingId" element={<UpdateListingPage />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route path="/request/:requestId" element={<Request />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
