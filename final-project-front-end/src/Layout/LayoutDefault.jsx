import { Outlet } from "react-router-dom";

import Header from "../Components/header/DefaultHeader.jsx";

export default function LayoutDefault() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
