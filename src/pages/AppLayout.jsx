import { Outlet } from "react-router-dom";
import "../styles/AppLayout.css";
import AppNav from "../components/AppNav";

export default function AppLayout() {
  return (
    <section className="app">
      <AppNav />
      <Outlet />
    </section>
  );
}
