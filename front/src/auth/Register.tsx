import { useState } from 'react'
import { Button, TextField, TextareaAutosize } from '@mui/material'
import { Person, MusicNote, Link, Description } from '@mui/icons-material'
import StepProgressBar from '../components/form/StepProgressBar'
import FormSectionHeader from '../components/form/FormSectionHeader'
import MultiSelect from '../components/form/MultiSelect'
import { FormData, FormDataArrayKeys } from '../@type/forms'
import cover from "../assets/bg.png";
import ImageUploadForm from '../components/form/ImageUploadForm'

const Register: React.FC = () => {
  const [step, setStep] = useState<number>(1)
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    firstname: '',
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
    otherPlatforms: ''
  });
  const [preview, setPreview] = useState<string >('')
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
    }
    setFormData(prev => ({ ...prev, photo: file || null }))
  }

  const handleMultiSelect = (category: FormDataArrayKeys, item: string) => {
    setFormData(prev => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter(i => i !== item)
        : [...prev[category], item]
    }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 6))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const activities = ["Singing", "Guitar", "Piano", "Drums", "Producing", "DJ"]
  const materials = ["Microphone", "Audio Interface", "MIDI Controller", "Speakers"]
  const softwares = ["Ableton Live", "FL Studio", "Logic Pro", "Pro Tools"]
  const skills = ["Composition", "Mixing", "Mastering", "Sound Design"]

  return (
    <div className='flex '>
      {/* <div className="flex-auto w-60 min-h-screen 
      bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center 
      justify-center p-20"> */}
      <div className="flex-auto w-60 min-h-screen 
      bg-gradient-to-r from-slate-400 via-neutral-500 to-slate-600 flex items-center 
      justify-center p-20">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl">
          <StepProgressBar step={step} totalSteps={6} />

          <form className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <FormSectionHeader icon={Person} title="Basic Information" />
                <TextField
                  label="Email"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Name"
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
                <TextField
                  label="First Name"
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Username"
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <FormSectionHeader icon={MusicNote} title="Musical Profile" />
                <ImageUploadForm handleFileChange={handleFileChange} preview={preview} />
                <TextField
                  label="City"
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextareaAutosize
                  minRows={4}
                  id="biography"
                  name="biography"
                  value={formData.biography}
                  onChange={handleInputChange}
                  placeholder="Biography"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <FormSectionHeader icon={MusicNote} title="Musical Profile" />
                <div>
                  <label>Musical Activities</label>
                  <MultiSelect items={activities} category="activities" selectedItems={formData.activities} onItemSelect={handleMultiSelect} />
                </div>
                <div>
                  <label>Musical Equipment</label>
                  <MultiSelect items={materials} category="materials" selectedItems={formData.materials} onItemSelect={handleMultiSelect} />
                </div>
              </div>
            )}
            {step === 4 && (
              <div className="space-y-4">
                <FormSectionHeader icon={MusicNote} title="Musical Profile" />
                <div>
                  <label>Music Software</label>
                  <MultiSelect items={softwares} category="softwares" selectedItems={formData.softwares} onItemSelect={handleMultiSelect} />
                </div>
                <div>
                  <label>Skills</label>
                  <MultiSelect items={skills} category="skills" selectedItems={formData.skills} onItemSelect={handleMultiSelect} />
                </div>
              </div>
            )}
            {step === 5 && (
              <div className="space-y-4">
                <FormSectionHeader icon={Link} title="Social Media Links" />
                <TextField
                  label="Twitter"
                  type="url"
                  id="twitter"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Instagram"
                  type="url"
                  id="instagram"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Facebook"
                  type="url"
                  id="facebook"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Deezer"
                  type="url"
                  id="deezer"
                  name="deezer"
                  value={formData.deezer}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Spotify"
                  type="url"
                  id="spotify"
                  name="spotify"
                  value={formData.spotify}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Tidal"
                  type="url"
                  id="tidal"
                  name="tidal"
                  value={formData.tidal}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Other Platforms"
                  type="url"
                  id="otherPlatforms"
                  name="otherPlatforms"
                  value={formData.otherPlatforms}
                  onChange={handleInputChange}
                  fullWidth
                />
              </div>
            )}

            {step === 6 && (
              <div className="space-y-4">
                <FormSectionHeader icon={Description} title="Summary" />
                <p className="text-center">
                  Review your information before submitting.
                </p>
              </div>
            )}

            <div className="flex justify-between">
              {step > 1 && <Button onClick={prevStep}>Back</Button>}
              {step < 6 && <Button variant="contained" color="primary" onClick={nextStep}>Next</Button>}
              {step === 6 && <Button variant="contained" color="primary" type="submit">Submit</Button>}
            </div>
          </form>
        </div>
      </div>
      <div className="min-h-screen flex-auto " style={{
        backgroundImage: `url(${cover})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      >

      </div>

    </div>
  )
}


export default Register;