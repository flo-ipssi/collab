"use client";
import Link from "next/link";
import { SVGProps } from "react";
import LoginForm from "./LoginForm";
import { MenuIcon, Music2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md">
                <div className="container flex items-center justify-between h-16 px-4 md:px-6">
                    <Link href="#" className="flex items-center gap-2" prefetch={false}>
                        <Music2Icon className="w-6 h-6" />
                        <span className="text-lg font-semibold">Music Maestro</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-4">
                        <Link
                            href="#"
                            className="text-sm font-medium hover:underline"
                            prefetch={false}
                        >
                            Features
                        </Link>
                        <Link
                            href="#"
                            className="text-sm font-medium hover:underline"
                            prefetch={false}
                        >
                            Player
                        </Link>
                        <Link
                            href="#"
                            className="text-sm font-medium hover:underline"
                            prefetch={false}
                        >
                            Contact
                        </Link>
                        <LoginForm />
                    </nav>
                    <Button variant="outline" size="sm" className="md:hidden">
                        <MenuIcon className="w-5 h-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </div>
            </header>
            {/* <header className="px-4 lg:px-6 h-14 flex items-center bg-background shadow">
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
                    
                </div>
            </header> */}
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
