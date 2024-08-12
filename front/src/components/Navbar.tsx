import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import logo from "../assets/logo.png";
const Navbar: React.FC = () => {
    const { token, logout, user } = useAuth();

    return (
        <header className="px-10 lg:px-6 h-20 flex items-center bg-transparent border-b-2 border-b-white">
            <Link
                to={"/"}
                className="flex h-20 px-4 items-center justify-center bg-white"
            >
                <img src={logo} alt="Logo" className="w-24" />;
                <span className="sr-only">LinkedIn Musical</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
                <Link
                    to={"/trouve-ta-colllab"}
                    className="uppercase leading-10 text-sm text-white font-medium hover:underline underline-offset-4"
                >
                    Trouve ta collab
                </Link>
                <Link
                    to={"/dashboard"}
                    className="uppercase leading-10 text-sm text-white font-medium hover:underline underline-offset-4"
                >
                    Actualités
                </Link>
                <Link
                    to={"/profile"}
                    className="uppercase leading-10 text-sm text-white font-medium hover:underline underline-offset-4"
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
                        <Link
                            to={"/login"}
                            className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 slate:bg-slate-600 slate:hover:bg-slate-700 focus:outline-none slate:focus:ring-slate-800"
                        >
                            Connexion
                        </Link>
                        <Link
                            to={"#"}
                            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800"
                        >
                            Inscription
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
