import { Outlet } from "react-router-dom";

import Header from "../Components/Header/DefaultHeader.jsx";

export default function LayoutDefault() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
