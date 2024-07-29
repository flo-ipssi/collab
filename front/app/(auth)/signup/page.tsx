/**
 * v0 by Vercel.
 * @see https://v0.dev/t/HMR9rBUFn3B
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { JSX, SVGProps, useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SingUpRoute() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleNextStep = () => {
    if (currentStep === 1 && formData.name && formData.email) {
      setCurrentStep(2)
    } else if (currentStep === 2 && formData.password && formData.confirmPassword) {
      setCurrentStep(3)
    }
  }
  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Inscription</h1>
        <p className="text-muted-foreground">Remplissez les informations ci-dessous pour créer un compte.</p>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-4">
          <div className={`h-2 w-full rounded-full ${currentStep >= 1 ? "bg-primary" : "bg-muted"}`} />
          <div className={`h-2 w-full rounded-full ${currentStep >= 2 ? "bg-primary" : "bg-muted"}`} />
          <div className={`h-2 w-full rounded-full ${currentStep >= 3 ? "bg-primary" : "bg-muted"}`} />
        </div>
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                name="name"
                placeholder="Entrez votre nom"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Entrez votre email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button onClick={handleNextStep} className="w-full">
              Suivant
            </Button>
          </div>
        )}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Entrez votre mot de passe"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirmez votre mot de passe"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button onClick={handleNextStep} className="w-full">
              Suivant
            </Button>
          </div>
        )}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="text-center">
              <CheckIcon className="mx-auto h-12 w-12 text-primary" />
              <h2 className="text-2xl font-bold">Inscription réussie !</h2>
              <p className="text-muted-foreground">Vous pouvez maintenant vous connecter avec votre nouveau compte.</p>
            </div>
            <Link href="/login">
              <Button className="w-full">
                Se connecter
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

function CheckIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}


function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}