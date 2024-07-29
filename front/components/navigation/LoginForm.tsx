"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import SigninWithGoogle from "@/components/SignInWithGoogle";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const LoginForm = () => {
    // const router = useRouter();
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const loginUser = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        signIn("credentials", {
            ...data,
            redirect: false,
        });
        // router.push("/home");
    };
    return (
        <div className="ml-auto flex gap-2 items-center">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Se connecter</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Bienvenue</DialogTitle>
                        <DialogDescription>
                            Connectez-vous à votre compte ou créez-en un nouveau.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        value={data.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Mot de passe</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        value={data.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Se connecter
                                </Button>
                            </div>
                            <Separator className="my-8" />
                            <div>
                                <SigninWithGoogle />
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <Link href="/signup">
                <Button>Inscription</Button>
            </Link>
        </div>
    );
};

export default LoginForm;
