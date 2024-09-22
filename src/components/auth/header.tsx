import React from "react";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const NavigationPage = (page) => {
        localStorage.setItem("loginadmin", "true");
        navigate("/");
      };
    return (
        <div className="flex space-x-4 mb-4 table-header-btn-ui items-center justify-end mt-5 mr-5">
            <button className="px-4 py-2 bg-white-500 text-black font-bold rounded hover:bg-blue-700" onClick={NavigationPage}>Log In</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Get started</button>
        </div>
    );
};

export default Header;
