import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import logo from "../assets/logo.png";
const Navbar: React.FC = () => {
    const { token, logout, user } = useAuth();

    return (
        <header className="px-10 lg:px-6 h-20 flex items-center bg-slate-950">
            <Link to={"#"} className="flex h-20 px-4 items-center justify-center bg-white">
                <img src={logo} alt="Logo" className="w-24" />;
                <span className="sr-only">LinkedIn Musical</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
                <Link
                    to={"#"}
                    className="uppercase leading-9 text-sm text-white font-medium hover:underline underline-offset-4"
                >
                    Trouve ta collab
                </Link>
                <Link
                    to={"#"}
                    className="uppercase leading-9 text-sm text-white font-medium hover:underline underline-offset-4"
                >
                    Actualités
                </Link>
                <Link
                    to={"#"}
                    className="uppercase leading-9 text-sm text-white font-medium hover:underline underline-offset-4"
                >
                    Profil
                </Link>
                {token ? (
                    <button
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                        onClick={logout}
                    >
                        Déconnextion
                    </button>
                ) : (
                    <>
                        <Link to={"/login"} className="text-sm font-medium">
                            Connexion
                        </Link>
                        <Link to={"#"} className="text-sm font-medium">
                            Inscription
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
