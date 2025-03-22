import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationProvider } from "../context/NotificationContext";
import { WorkshopProvider } from "../context/WorkshopContext";
import { FilterProvider } from "../context/FilterContext";
import "../styles/App.css";
import ProtectedRoute from "../components/ProtectedRoute";
import Homepage from "./Homepage";
import AppLayout from "./AppLayout";
import Login from "./Login";
import SignUp from "./SignUp";
import PaletteList from "./PaletteList";
import PaletteGrid from "../components/PaletteGrid";
import PaletteFilters from "../components/PaletteFilters";
import Profile from "./Profile";
import Bio from "../components/Bio";
import Saved from "../components/Saved";
import Workshop from "./Workshop";
import ProfileNav from "../components/ProfileNav";
import PrivacyPolicy from "./PrivacyPolicy";
import About from "./About";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <FilterProvider>
          <WorkshopProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" index element={<Homepage />} />
                <Route
                  path="/app"
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="palettes" />} />
                  <Route
                    path="palettes"
                    element={
                      <PaletteList>
                        <PaletteFilters />
                        <PaletteGrid />
                      </PaletteList>
                    }
                  />
                  <Route path="workshop" element={<Workshop />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route
                  path="/profile"
                  element={
                    <Profile>
                      <ProfileNav />
                      <Bio />
                      <Saved />
                    </Profile>
                  }
                />
                <Route path="/about" element={<About />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              </Routes>
            </BrowserRouter>
          </WorkshopProvider>
        </FilterProvider>
      </NotificationProvider>
    </QueryClientProvider>
  );
}
