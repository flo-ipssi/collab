"use client";
import Link from "next/link";
import { SVGProps } from "react";
import LoginForm from "./LoginForm";

const Navbar = () => {

    return (
        <>
            <header className="px-4 lg:px-6 h-14 flex items-center bg-background shadow">
                <Link
                    href="/home"
                    className="flex items-center justify-center"
                    prefetch={false}
                >
                    <MountainIcon className="h-6 w-6" />
                    <span className="sr-only">Acme Inc</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6 text-center">
                    <Link
                        href="#"
                        className="text-sm font-medium hover:underline underline-offset-4"
                        prefetch={false}
                    >
                        Accueil
                    </Link>
                    <Link
                        href="#"
                        className="text-sm font-medium hover:underline underline-offset-4"
                        prefetch={false}
                    >
                        À propos
                    </Link>
                </nav>
                <div className="ml-auto flex gap-2 items-center">
                    <LoginForm />
                </div>
            </header>
        </>
    );
};

function MountainIcon(
    props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
    );
}
export default Navbar;