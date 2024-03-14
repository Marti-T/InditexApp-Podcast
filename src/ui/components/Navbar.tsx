import { FC } from 'react';
import { Link } from "react-router-dom";

export const Navbar: FC = () => {
  return (
    <div className="navbar">
      <Link to={'/'} className="navbar__title">Podcaster</Link>
      <div className="navbar__line"></div>
    </div>
  );
};