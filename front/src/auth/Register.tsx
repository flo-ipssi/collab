import { useEffect, useState } from 'react'
import { Button, Checkbox, TextField, TextareaAutosize } from '@mui/material'
import { Person, MusicNote, Link, Description, MusicNoteRounded } from '@mui/icons-material'
import StepProgressBar from '../components/form/StepProgressBar'
import FormSectionHeader from '../components/form/FormSectionHeader'
import MultiSelect from '../components/form/MultiSelect'
import { City, Country, FormData, FormDataArrayKeys, Profession } from '../@type/forms'
import cover from "../assets/bg.png";
import ImageUploadForm from '../components/form/ImageUploadForm'
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios'

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const Register: React.FC = () => {
  const [step, setStep] = useState<number>(1)
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    firstname: '',
    lastname: '',
    username: '',
    photo: null,
    city: null,
    country: null,
    postalCode: '',
    professions: [],
    materials: [],
    softwares: [],
    skills: [],
    profile: {
      bio: '',
      twitter: '',
      instagram: '',
      facebook: '',
      deezer: '',
      spotify: '',
      tidal: '',
      otherPlatforms: ''
    }
  });
  const [preview, setPreview] = useState<string>('')

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

  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [professions, setProfessions] = useState<Profession[]>([]);

  // Retrieve Countries
  useEffect(() => {
    axios.get('https://countriesnow.space/api/v0.1/countries/')
      .then((response) => {
        const countryList: Country[] = response.data.data.map((country: { country: string }) => ({
          label: country.country,
          value: country.country,
        }));
        setCountries(countryList);
      })
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  // If country selected, we retrieve cities
  useEffect(() => {
    if (formData.country) {
      axios.post('https://countriesnow.space/api/v0.1/countries/cities', { country: formData.country.value })
        .then((response) => {
          const cityList: City[] = response.data.data.map((city: string) => ({
            label: city,
            value: city,
          }));
          console.log(cityList);

          setCities(cityList);
        })
        .catch((error) => console.error('Error fetching cities:', error));
    }
  }, [formData.country]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/professions')
      .then((response) => {
        const professionList: Profession[] = response.data.map((profession: { id: number, name: string }) => ({
          name: profession.name,
          value: profession.id,
        }));
        console.log(professionList);

        setProfessions(professionList);
      })
      .catch((error) => console.error('Error fetching professions:', error));

  }, [])


  const handleAutocompleteChange = (
    event: React.SyntheticEvent,
    value: Country | City | Profession | null,
    name: keyof FormData
  ) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 6))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const activities = ["Singing", "Guitar", "Piano", "Drums", "Producing", "DJ"]
  const materials = ["Microphone", "Audio Interface", "MIDI Controller", "Speakers"]
  const softwares = ["Ableton Live", "FL Studio", "Logic Pro", "Pro Tools"]
  const skills = ["Composition", "Mixing", "Mastering", "Sound Design"]
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <div className='flex '>
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
                  label="Pseudo (visible opur les autres utilisateurs)"
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
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
                  label="Nom"
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Prénom"
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <FormSectionHeader icon={MusicNote} title="Profile" />
                <ImageUploadForm handleFileChange={handleFileChange} preview={preview} />
                <Autocomplete
                  options={countries}
                  getOptionLabel={(option) => option.label}
                  value={formData.country}
                  onChange={(event, value) => {
                    handleAutocompleteChange(event, value, 'country')
                    handleInputChange
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                {formData.country && cities.length > 0 ?
                  <Autocomplete
                    options={cities}
                    getOptionLabel={(option) => option.label}
                    value={formData.city}
                    onChange={(event, value) => {
                      handleAutocompleteChange(event, value, 'city')
                      handleInputChange
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="City"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                    disabled={!formData.country}
                  />
                  : null}


                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  options={professions}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, option, { selected }) => {
                    const { key, ...optionProps } = props;
                    return (
                      <li key={key} {...optionProps}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.name}
                      </li>
                    );
                  }}
                  style={{ width: 500 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Checkboxes" placeholder="Favorites" />
                  )}
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <FormSectionHeader icon={MusicNoteRounded} title="ACTIVIT2" />
                <div>
                  <label>Musical Activities</label>
                  {/* <MultiSelect items={activities} category="activities" selectedItems={formData.activities} onItemSelect={handleMultiSelect} /> */}
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

                <TextareaAutosize
                  minRows={4}
                  id="biography"
                  name="biography"
                  value={formData.profile.bio}
                  onChange={handleInputChange}
                  placeholder="Biography"
                  className="w-full p-2 border border-gray-300 rounded"
                />
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
                  value={formData.profile.twitter}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Instagram"
                  type="url"
                  id="instagram"
                  name="instagram"
                  value={formData.profile.instagram}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Facebook"
                  type="url"
                  id="facebook"
                  name="facebook"
                  value={formData.profile.facebook}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Deezer"
                  type="url"
                  id="deezer"
                  name="deezer"
                  value={formData.profile.deezer}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Spotify"
                  type="url"
                  id="spotify"
                  name="spotify"
                  value={formData.profile.spotify}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Tidal"
                  type="url"
                  id="tidal"
                  name="tidal"
                  value={formData.profile.tidal}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Other Platforms"
                  type="url"
                  id="otherPlatforms"
                  name="otherPlatforms"
                  value={formData.profile.otherPlatforms}
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