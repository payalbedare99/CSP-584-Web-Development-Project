import * as React from "react";
import { createBrowserRouter } from "react-router-dom";

import HomeScreen from "../pages/home";
// import SigninScreen from "../pages/signin";
// import SignupScreen from "../pages/signup";
import AuthScreen from "../pages/auth";
import ServicesPage from "../pages/services";
import TaskDataPage from "../pages/taskData";
import RepairMatesPage from "../pages/repairmates";
import PaymentPage from "../pages/payment";
import AboutPage from "../pages/about";
import UserInfo from "../pages/userinfo";
import ProfileMenuScreen from "../pages/profile/menu";
import OnboardingPage from "../pages/onboarding";
import MapWindow from "../pages/nearme";
import MyProfilePage from "../pages/profile/myprofile";
import MyAppointmentPage from "../pages/profile/appointments";
import MyOrdersPage from "../pages/profile/myorders";
import ReviewPage from "../pages/review";
import ViewReviewPage from "../pages/viewReview";
import UserViewPage from "../pages/profile/userview";
import AdminOrderPage from "../pages/profile/ordersAdmin";
import AdminServicePage from "../pages/profile/servicesAdmin";
import ProviderViewPage from "../pages/profile/providerView";
import AdminViewPage from "../pages/profile/adminView";
import ManageProviderPage from "../pages/profile/manageProvider";

export const router = createBrowserRouter([
  { path: "/", element: <HomeScreen /> },
  // { path: "/signin", element: <SigninScreen /> },
  // { path: "/signup", element: <SignupScreen /> },
  { path: "/services", element: <ServicesPage /> },
  { path: "/services", element: <ServicesPage /> },
  { path: "/auth", element: <AuthScreen /> },
  { path: "/task/:id", element: <TaskDataPage /> },
  { path: "/repairmates", element: <RepairMatesPage /> },
  { path: "/payment", element: <PaymentPage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/userinfo/:userId", element: <UserInfo /> },
  { path: "/profile_menu", element: <ProfileMenuScreen /> },
  { path: "/onboarding", element: <OnboardingPage /> },
  { path: "/nearme", element: <MapWindow /> },
  { path: "/myprofile", element: <MyProfilePage /> },
  { path: "/appointments", element: <MyAppointmentPage /> },
  { path: "/myorders", element: <MyOrdersPage /> },
  { path: "/review/:providerId", element: <ReviewPage /> },
  { path: "/viewreview/:providerId", element: <ViewReviewPage /> },
  { path: "/userview", element: <UserViewPage /> },
  { path: "/ordersAdmin", element: <AdminOrderPage /> },
  { path: "/servicesAdmin", element: <AdminServicePage /> },
  { path: "/providerView", element: <ProviderViewPage /> },
  { path: "/adminView", element: <AdminViewPage /> },
  { path: "/manageProvider", element: <ManageProviderPage /> },
]);
