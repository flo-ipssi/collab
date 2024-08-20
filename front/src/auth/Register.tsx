"use client";

import { Button, Checkbox, Input, Radio, RadioGroup } from "@material-ui/core";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import { useState } from "react";
import MultiSelect from "../components/form/MultiSelect";

const Register: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<{
    agreeTerms: boolean
    conf_password: string | number | readonly string[] | undefined
    password: string | number
    email: string
    name: string
    firstname: string  // Make sure to include this in both the type and the initial state
    username: string
    photo: File | null
    city: string
    biography: string
    activities: string[]
    materials: string[]
    softwares: string[]
    skills: string[]
    twitter: string
    instagram: string
    facebook: string
    deezer: string
    spotify: string
    tidal: string
    otherPlatforms: string
  }>({
    agreeTerms: false,
    conf_password: '',
    password: '',
    email: '',
    name: '',
    firstname: '',  // Include this property here
    username: '',
    photo: null,
    city: '',
    biography: '',
    activities: [],
    materials: [],
    softwares: [],
    skills: [],
    twitter: '',
    instagram: '',
    facebook: '',
    deezer: '',
    spotify: '',
    tidal: '',
    otherPlatforms: '',
  })
  

 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, photo: e.target.files ? e.target.files[0] : null }))
  }
  
  const handleMultiSelect = (category: keyof typeof formData, item: string) => {
    if (Array.isArray(formData[category])) {
      setFormData(prev => ({
        ...prev,
        [category]: (prev[category] as string[]).includes(item)
          ? (prev[category] as string[]).filter((i: string) => i !== item)
          : [...(prev[category] as string[]), item]
      }))
    }
  }
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const activities = ["Singing", "Guitar", "Piano", "Drums", "Producing", "DJ"]
  const materials = ["Microphone", "Audio Interface", "MIDI Controller", "Speakers"]
  const softwares = ["Ableton Live", "FL Studio", "Logic Pro", "Pro Tools"]
  const skills = ["Composition", "Mixing", "Mastering", "Sound Design"]

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="w-72">
              <div className="relative w-full min-w-[200px] h-10">
                <input
                  id="firstname"
                  name="firstname"
                  onChange={() => handleInputChange}
                  value={formData.firstname}
                  className="peer w-full h-full bg-transparent text-white 
                  font-sans font-normal outline outline-0 focus:outline-0 
                  disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  placeholder=" "
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Firstname
                </label>
              </div>
            </div>
            <div className="w-72">
              <div className="relative w-full min-w-[200px] h-10">
                <input
                  id="name"
                  name="name"
                  onChange={() => handleInputChange}
                  value={formData.name}
                  className="peer w-full h-full bg-transparent text-white 
                  font-sans font-normal outline outline-0 focus:outline-0 
                  disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  placeholder=" "
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                Name
                </label>
              </div>
            </div>
            <div className="w-72">
              <div className="relative w-full min-w-[200px] h-10">
                <input
                  id="username"
                  name="username"
                  onChange={() => handleInputChange}
                  value={formData.username}
                  className="peer w-full h-full bg-transparent text-white 
                    font-sans font-normal outline outline-0 focus:outline-0 
                    disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  placeholder=" "
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Username
                </label>
              </div>
            </div>
            <div className="w-72">
              <div className="relative w-full min-w-[200px] h-10">
                <input
                  id="email"
                  name="email"
                  onChange={() => handleInputChange}
                  value={formData.email}
                  className="peer w-full h-full bg-transparent text-white 
                    font-sans font-normal outline outline-0 focus:outline-0 
                    disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  placeholder=" "
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Email
                </label>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="w-72">
              <div className="relative w-full min-w-[200px] h-10">
                <input
                  id="password"
                  name="password"
                  onChange={() => handleInputChange}
                  value={formData.password}
                  className="peer w-full h-full bg-transparent text-white 
                  font-sans font-normal outline outline-0 focus:outline-0 
                  disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  placeholder=" "
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Password
                </label>
              </div>
            </div>
            <div className="w-72">
              <div className="relative w-full min-w-[200px] h-10">
                <input
                  id="conf_password"
                  name="conf_password"
                  onChange={() => handleInputChange}
                  value={formData.conf_password}
                  className="peer w-full h-full bg-transparent text-white 
                  font-sans font-normal outline outline-0 focus:outline-0 
                  disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  placeholder=" "
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Confirme Password
                </label>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center">
                 Musical Profile
              </h2>
              <div>
                <label htmlFor="photo" className="block font-medium text-gray-700">Profile Photo</label>
                <input type="file" id="photo" name="photo" onChange={handleFileChange} accept="image/*" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
              </div>
              <div>
                <label htmlFor="city" className="block font-medium text-gray-700">City</label>
                <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
              </div>
              <div>
                <label htmlFor="biography" className="block font-medium text-gray-700">Biography</label>
                <textarea id="biography" name="biography" value={formData.biography} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
              </div>
              <div>
                <label className="block font-medium text-gray-700">Musical Activities</label>
                <MultiSelect items={activities} category="activities" selectedItems={formData.activities} onSelect={() => handleMultiSelect} />
              </div>
              <div>
                <label className="block font-medium text-gray-700">Musical Equipment</label>
                <MultiSelect items={materials} category="materials" selectedItems={formData.materials} onSelect={() => handleMultiSelect} />
              </div>
              <div>
                <label className="block font-medium text-gray-700">Music Software</label>
                <MultiSelect items={softwares} category="softwares" selectedItems={formData.softwares} onSelect={() => handleMultiSelect} />
              </div>
              <div>
                <label className="block font-medium text-gray-700">Skills</label>
                <MultiSelect items={skills} category="skills" selectedItems={formData.skills} onSelect={() => handleMultiSelect} />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={(checked: any) =>
                  setFormData((prev) => ({ ...prev, agreeTerms: checked }))
                }
              />
              <label htmlFor="terms">I agree to the terms and conditions</label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderPresentation = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            {/* <User className="w-16 h-16 text-primary" /> */}
            <h2 className="text-2xl font-bold">Create Your Account</h2>
            <p>Start your journey with us by creating your personal account.</p>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            {/* <Lock className="w-16 h-16 text-primary" /> */}
            <h2 className="text-2xl font-bold">Secure Your Account</h2>
            <p>
              Choose a strong password to keep your account safe and protected.
            </p>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            {/* <Zap className="w-16 h-16 text-primary" /> */}
            <h2 className="text-2xl font-bold">Customize Your Experience</h2>
            <p>
              Tell us how you plan to use your account for a tailored
              experience.
            </p>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            {/* <Mail className="w-16 h-16 text-primary" /> */}
            <h2 className="text-2xl font-bold">Almost There!</h2>
            <p>Review and accept our terms to complete your registration.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex flex-col  justify-center w-full bg-white   p-8 bg-background">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Register</h1>
          <p className="text-muted-foreground">Step {step} of 4</p>
        </div>
        <form className="space-y-6 ">
          {renderForm()}
          <div className="flex justify-between">
            {step > 1 && (
              <Button type="button" onClick={prevStep}>
                <KeyboardArrowDown className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            {step < 4 ? (
              <Button type="button" onClick={nextStep} className="ml-auto">
                Next
                <KeyboardArrowDown className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button type="submit" className="ml-auto">
                Complete Registration
              </Button>
            )}
          </div>
        </form>
      </div>
      <div className="hidden lg:flex text-white flex-coljustify-center items-center w-full bg-primary text-primary-foreground">
        {renderPresentation()}
      </div>
    </div>
  );
};

export default Register;
