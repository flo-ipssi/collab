import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Checkbox, CircularProgress } from "@mui/material";
import {
  Person,
  MusicNote,
  Link,
  MusicNoteRounded,
} from "@mui/icons-material";
import StepProgressBar from "../components/form/StepProgressBar";
import FormSectionHeader from "../components/form/FormSectionHeader";
import { City, Country, FormUserData, Model, Profession } from "../@type/forms";
import cover from "../assets/bg.png";
import ImageUploadForm from "../components/form/ImageUploadForm";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import EquipmentSelector from "../components/EquipmentSelector";
import SummaryView from "../components/SummaryView";
import { useNavigate } from "react-router-dom";
import PasswordField from "../components/form/PasswordField";
import { uploadToCloudinary } from "../cloud/cloudinaryService";

const Register: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [preview, setPreview] = useState<string>("");
  const navigate = useNavigate();
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 6));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [formUserData, setFormData] = useState<FormUserData>({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    username: "",
    citySelected: null,
    countrySelected: null,
    professions: [],
    equipments: [],
    profileInfos: {
      avatar: null,
      bio: "",
      twitter: "",
      instagram: "",
      facebook: "",
      youtube: "",
      deezer: "",
      spotify: "",
      tidal: "",
      otherPlatforms: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);


  const handleAutocompleteChange = (
    event: React.SyntheticEvent,
    value: Country | City | Profession[] | null,
    name: keyof FormUserData
  ) => {
    setFormData({
      ...formUserData,
      [name]: value,
    });
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/create/user', formUserData);

      if (response.status === 201) {
        const token = response.data.token;
        const folder = response.data.folder;
        localStorage.setItem('token', token);
        let avatarUrl: string | null = null;
        let userID = response.data.user.profile.id;

        console.log('avatar: ' +formUserData.profileInfos.avatar);
        
        if (formUserData.profileInfos.avatar) {
          const cloudinaryResult = await uploadToCloudinary(
            formUserData.profileInfos.avatar,
            `colllab/user/${folder}`
          );

          if (cloudinaryResult) {
            avatarUrl = cloudinaryResult.secure_url;
            console.log('Avatar uploaded successfully:', avatarUrl);
          }
        }

        try {
          await axios.patch(
            `http://localhost:8000/api/profiles/${userID}`,
            {
              "avatar": avatarUrl,
            },
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': "application/merge-patch+json",
              }
            }
          );
          window.location.reload();
        } catch (error) {
          console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        }
      }

    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      profileInfos: {
        ...prev.profileInfos,
        [name]: value,
      },
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    setFormData((prev) => ({
      ...prev,
      profileInfos: {
        ...prev.profileInfos,
        avatar: file || null,
      },
    }));
  };

  const handleEquipmentChange = (selectedModels: Model[]) => {
    setFormData((prevData) => ({
      ...prevData,
      equipments: selectedModels,
    }));
  };

  const handlePasswordValid = (validPassword: string) => {
    setFormData((prevData) => ({
      ...prevData,
      password: validPassword,
    }));
    console.log("Mot de passe validé :", validPassword);
  };

  // Retrieve Countries
  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/")
      .then((response) => {
        const countryList: Country[] = response.data.data.map(
          (country: { country: string }) => ({
            label: country.country,
            value: country.country,
          })
        );
        setCountries(countryList);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  // If country selected, we retrieve cities
  useEffect(() => {
    if (formUserData.countrySelected) {
      axios
        .post("https://countriesnow.space/api/v0.1/countries/cities", {
          country: formUserData.countrySelected.value,
        })
        .then((response) => {
          const cityList: City[] = response.data.data.map((city: string) => ({
            label: city,
            value: city,
          }));
          setCities(cityList);
        })
        .catch((error) => console.error("Error fetching cities:", error));
    }
  }, [formUserData.countrySelected]);

  // Professions
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/professions")
      .then((response) => {
        const professionList: Profession[] = response.data.map(
          (profession: { id: number; name: string }) => ({
            name: profession.name,
            id: profession.id,
          })
        );

        setProfessions(professionList);
      })
      .catch((error) => console.error("Error fetching professions:", error));
  }, []);

  return (
    <div className="flex ">
      <div
        className="flex-auto w-60 min-h-screen 
      bg-gradient-to-r from-slate-400 via-neutral-500 to-slate-600 flex items-center 
      justify-center p-20"
      >
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl">
          <StepProgressBar step={step} totalSteps={6} />

          <form className="space-y-6" onSubmit={onSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <FormSectionHeader icon={Person} title="Basic Information" />

                <TextField
                  label="Pseudo (Nom d'artiste)"
                  type="text"
                  id="username"
                  name="username"
                  multiline
                  maxRows={4}
                  variant="outlined"
                  value={formUserData.username}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Prénom"
                  type="text"
                  id="firstname"
                  name="firstname"
                  multiline
                  maxRows={4}
                  variant="outlined"
                  value={formUserData.firstname}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Nom"
                  id="lastname"
                  name="lastname"
                  multiline
                  maxRows={4}
                  variant="outlined"
                  value={formUserData.lastname}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Email"
                  type="email"
                  id="email"
                  name="email"
                  multiline
                  maxRows={4}
                  variant="outlined"
                  value={formUserData.email}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
                <PasswordField onPasswordValid={handlePasswordValid} />

              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <FormSectionHeader icon={MusicNote} title="Profile" />
                <ImageUploadForm
                  handleFileChange={handleFileChange}
                  preview={preview}
                />
                <Autocomplete
                  options={countries}
                  getOptionLabel={(option) => option.label}
                  value={formUserData.countrySelected}
                  isOptionEqualToValue={(option, value) => option.label === value.label}
                  onChange={(event, value) => {
                    handleAutocompleteChange(event, value, "countrySelected");
                    handleInputChange;
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country"
                      multiline
                      maxRows={4}
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                {formUserData.countrySelected && cities.length > 0 ? (
                  <>
                    <Autocomplete
                      options={cities}
                      getOptionLabel={(option) => option.label}
                      value={formUserData.citySelected}
                      onChange={(event, value) => {
                        handleAutocompleteChange(event, value, "citySelected");
                        handleInputChange;
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="City"
                          multiline
                          maxRows={4}
                          variant="outlined"
                          fullWidth
                        />
                      )}
                      disabled={!formUserData.countrySelected}
                    />

                    <Autocomplete
                      multiple
                      id="checkboxes-professions"
                      options={professions}
                      disableCloseOnSelect
                      onChange={(event, value) => {
                        handleAutocompleteChange(event, value, "professions");
                        handleInputChange;
                      }}
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
                      renderInput={(params) => (
                        <TextField {...params}
                          multiline
                          maxRows={4}
                          variant="outlined" label="Professions" />
                      )}
                    />
                  </>
                ) : null}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <FormSectionHeader icon={MusicNoteRounded} title="ACTIVITES" />
                <EquipmentSelector onChange={handleEquipmentChange} />
              </div>
            )}
            {step === 4 && (
              <div className="space-y-4">
                <FormSectionHeader icon={MusicNote} title="Bio" />
                <textarea
                  aria-label="minimum"
                  id="bio"
                  name="bio"
                  value={formUserData.profileInfos.bio}
                  onChange={handleProfileInputChange}
                  placeholder="Biography"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            )}
            {step === 5 && (
              <div className="space-y-4">
                <FormSectionHeader icon={Link} title="Social Media Links" />
                <TextField
                  multiline
                  maxRows={4}
                  variant="outlined"
                  label="Twitter"
                  type="url"
                  id="twitter"
                  name="twitter"
                  value={formUserData.profileInfos.twitter}
                  onChange={handleProfileInputChange}
                  fullWidth
                />
                <TextField
                  multiline
                  maxRows={4}
                  variant="outlined"
                  label="Instagram"
                  type="url"
                  id="instagram"
                  name="instagram"
                  value={formUserData.profileInfos.instagram}
                  onChange={handleProfileInputChange}
                  fullWidth
                />
                <TextField
                  multiline
                  maxRows={4}
                  variant="outlined"
                  label="Youtube"
                  type="url"
                  id="youtube"
                  name="youtube"
                  value={formUserData.profileInfos.youtube}
                  onChange={handleProfileInputChange}
                  fullWidth
                />
                <TextField
                  multiline
                  maxRows={4}
                  variant="outlined"
                  label="Facebook"
                  type="url"
                  id="facebook"
                  name="facebook"
                  value={formUserData.profileInfos.facebook}
                  onChange={handleProfileInputChange}
                  fullWidth
                />
                <TextField
                  multiline
                  maxRows={4}
                  variant="outlined"
                  label="Deezer"
                  type="url"
                  id="deezer"
                  name="deezer"
                  value={formUserData.profileInfos.deezer}
                  onChange={handleProfileInputChange}
                  fullWidth
                />
                <TextField
                  multiline
                  maxRows={4}
                  variant="outlined"
                  label="Spotify"
                  type="url"
                  id="spotify"
                  name="spotify"
                  value={formUserData.profileInfos.spotify}
                  onChange={handleProfileInputChange}
                  fullWidth
                />
                <TextField
                  multiline
                  maxRows={4}
                  variant="outlined"
                  label="Tidal"
                  type="url"
                  id="tidal"
                  name="tidal"
                  value={formUserData.profileInfos.tidal}
                  onChange={handleProfileInputChange}
                  fullWidth
                />
                <TextField
                  multiline
                  maxRows={4}
                  variant="outlined"
                  label="Other Platforms"
                  type="url"
                  id="otherPlatforms"
                  name="otherPlatforms"
                  value={formUserData.profileInfos.otherPlatforms}
                  onChange={handleProfileInputChange}
                  fullWidth
                />
              </div>
            )}

            {step === 6 && <SummaryView formData={formUserData} avatar={preview} />}

            <div className="flex justify-between">
              {step > 1 && <Button onClick={prevStep}>Back</Button>}
              {step < 6 && (
                <Button variant="contained" color="primary" onClick={nextStep}>
                  Next
                </Button>
              )}
              {step === 6 && (
                <Button variant="contained" color="primary" type="submit" disabled={isLoading} >
                  {isLoading ? <CircularProgress size={24} /> : "Inscription"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
      <div
        className="min-h-screen flex-auto "
        style={{
          backgroundImage: `url(${cover})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  );
};

export default Register;
