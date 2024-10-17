import React, { useCallback, useEffect, useState } from "react";

import { Button, Checkbox, CircularProgress, Drawer, IconButton, TextField } from "@material-ui/core";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";
import CardProfileSearch from "../components/CardSearch";
import { ShieldCloseIcon } from "lucide-react";
import { Autocomplete } from "@mui/material";

interface Equipment {
   id: number;
   brand: string;
   model: string;
}

interface Material {
   id: number;
   name: string;
   description: string;
   equipment: Equipment[];
}

interface Activity {
   id: number;
   name: string;
   description: string;
}

interface Props { }

const Search: React.FC<Props> = () => {
   const { token } = useAuth();
   const [searchTerm, setSearchTerm] = useState("");
   const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
   const [searchResults, setSearchResults] = useState([]);
   const [loading, setLoading] = useState(false);  // Loader state
   const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
   const [totalResults, setTotalResults] = useState(0); // Total number of results
   const [resultsPerPage] = useState(10);
   const [expandedMaterialId, setExpandedMaterialId] = useState<number | null>(null); // ID du matériau actuellement ouvert
   const [materials, setMaterials] = useState<Material[]>([]); // Stocke les matériaux et équipements
   const [selectedEquipments, setSelectedEquipments] = useState<number[]>([]); // Stocke les équipements sélectionnés

   const [activities, setActivities] = useState<Activity[]>([]); // Stocke les activités
   const [selectedActivities, setSelectedActivities] = useState<number[]>([]); // Stocke les activités sélectionnées
   const [selectedStyles, setSelectedStyles] = useState<string[]>([]); // Stocke les styles musicaux sélectionnés
   const [localisation, setLocalisation] = useState(""); // Champ pour la localisation

   // Liste prédéfinie pour les styles musicaux
   const musicStyles = ["Rock", "Rap", "Pop", "Reggae"];
   const totalPages = Math.ceil(totalResults / resultsPerPage);


   const [countries, setCountries] = useState([]);
   const [selectedCountry, setSelectedCountry] = useState("");
   const [cities, setCities] = useState([]);
   const [selectedCities, setSelectedCities] = useState<string[]>([]); // Villes sélectionnées (liste de villes)


   const handleSearchChange = (event: {
      target: { value: React.SetStateAction<string> };
   }) => {
      setSearchTerm(event.target.value);
   };

   const debounce = (func: (...args: any[]) => void, delay: number) => {
      let timeoutId: NodeJS.Timeout;
      return (...args: any[]) => {
         clearTimeout(timeoutId);
         timeoutId = setTimeout(() => {
            func(...args);
         }, delay);
      };
   };
   const fetchSearchResults = async (term: string, page: number = 1) => {
      if (term.length >= 3) {

         setLoading(true);
         try {
            const response = await axios.get(`http://localhost:8000/api/search/${term}/${page}`, {
               headers: {
                  Authorization: `Bearer ${token}`,
               }
            });
            console.log(response);
            console.log(response.data);
            console.log(response.data.results);

            const results = response.data.results || [];
            setSearchResults(results);
            setTotalResults(response.data.total || 0);
         } catch (error) {
            console.error("Erreur lors de l'appel API", error);
         } finally {
            setLoading(false);
         }
      } else {
         setSearchResults([]);
      }
   };

   const debouncedFetchSearchResults = useCallback(debounce(fetchSearchResults, 300), []);

   useEffect(() => {
      debouncedFetchSearchResults(searchTerm);
   }, [searchTerm, debouncedFetchSearchResults]);

   const handlePageChange = (page: number) => {
      setCurrentPage(page);
   };

   const toggleFilterDrawer = (open: boolean) => {
      setFilterDrawerOpen(open);
   };

   const fetchMaterials = async () => {
      try {
         const response = await axios.get("http://localhost:8000/api/materials");
         setMaterials(response.data);
      } catch (error) {
         console.error("Erreur lors de la récupération des matériaux", error);
      }
   };

   // Fonction pour récupérer les activités via une API
   const fetchActivities = async () => {
      try {
         const response = await axios.get("http://localhost:8000/api/professions");
         setActivities(response.data);
      } catch (error) {
         console.error("Erreur lors de la récupération des activités", error);
      }
   };

   // Appeler l'API pour récupérer les matériaux à l'ouverture de la modal
   useEffect(() => {
      if (filterDrawerOpen) {
         fetchMaterials();
         fetchActivities();
      }
   }, [filterDrawerOpen]);


   // Gérer l'expansion/collapse du matériau sélectionné
   const toggleMaterialExpansion = (materialId: number) => {
      setExpandedMaterialId((prevId) => (prevId === materialId ? null : materialId));
   };

   // Gérer la sélection des équipements
   const handleEquipmentChange = (equipmentId: number) => {
      setSelectedEquipments((prev) =>
         prev.includes(equipmentId)
            ? prev.filter((id) => id !== equipmentId)
            : [...prev, equipmentId]
      );
   };

   // Gérer la sélection des activités
   const handleActivityChange = (activityId: number) => {
      setSelectedActivities((prev) =>
         prev.includes(activityId)
            ? prev.filter((id) => id !== activityId)
            : [...prev, activityId]
      );
   };

   // Gérer la sélection des styles musicaux
   const handleStyleChange = (style: string) => {
      setSelectedStyles((prev) =>
         prev.includes(style)
            ? prev.filter((s) => s !== style)
            : [...prev, style]
      );
   };

   const applyFilters = async () => {
      setLoading(true);
      try {
         const response = await axios.post("http://localhost:8000/api/search", {
            equipments: selectedEquipments,
            activities: selectedActivities,
            musicStyles: selectedStyles,
            localisation: localisation,
         });
         setSearchResults(response.data.results);
      } catch (error) {
         console.error("Erreur lors de la recherche avec filtres", error);
      } finally {
         setLoading(false);
         toggleFilterDrawer(false); // Ferme la modal après l'application des filtres
      }
   };
   useEffect(() => {
      const fetchCountries = async () => {
         try {
            const response = await axios.get(
               "https://countriesnow.space/api/v0.1/countries"
            );
            const countryNames = response.data.data.map(
               (country: any) => country.country
            );
            setCountries(countryNames);
         } catch (error) {
            console.error("Erreur lors de la récupération des pays:", error);
         }
      };

      fetchCountries();
   }, []);

   // Fonction pour récupérer les villes une fois un pays sélectionné
   const fetchCities = async (country: string) => {
      try {
         const response = await axios.post(
            "https://countriesnow.space/api/v0.1/countries/cities",
            { country }
         );
         setCities(response.data.data);
      } catch (error) {
         console.error("Erreur lors de la récupération des villes:", error);
      }
   };

   // Gestion de la sélection d'un pays
   const handleCountryChange = (
      event: React.SyntheticEvent,
      newValue: string | null
   ) => {
      if (newValue) {
         setSelectedCountry(newValue);
         setCities([]); // Réinitialiser les villes à chaque changement de pays
         setSelectedCities([]); // Réinitialiser les villes sélectionnées
         fetchCities(newValue); // Charger les villes du pays sélectionné
      }
   };

   // Gestion de la sélection d'une ville
   const handleCitiesChange = (
      event: React.SyntheticEvent,
      newValues: string[]
   ) => {
      if (newValues) {
         setSelectedCities(newValues); // Mettre à jour les villes sélectionnées
      }
   };

   return (
      <div className="flex-1 gap-6 p-6">
         <div className="bg-gray-100 rounded-lg shadow-lg p-6 space-y-6">
            <div className="flex items-center gap-4">
               <div className="relative flex-1">
                  <svg
                     className="absolute left-2.5 top-3.5 h-4 w-4 text-gray-500"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                     />
                  </svg>
                  <input
                     type="search"
                     placeholder="Recherche"
                     value={searchTerm}
                     onChange={handleSearchChange}
                     className="pl-8 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
               </div>

               <Button variant="contained" onClick={() => toggleFilterDrawer(true)}>
                  Filtres
               </Button>
            </div>

            <div className="grid gap-6">
               {loading ? (
                  <div className="flex justify-center mt-6">
                     <CircularProgress />
                  </div>
               ) : (
                  <div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        {searchResults.length > 0 ? (
                           searchResults.map((result: any, index: number) => (
                              <CardProfileSearch
                                 key={index}
                                 index={index}
                                 buttonText="Voir le profil"
                                 imageSrc={result.profile.avatar}
                                 name={result.username}
                                 profession={result.profession}
                                 onButtonClick={() => undefined}
                              />
                           ))
                        ) : (
                           <p className="text-center text-gray-500">Aucun résultat</p>
                        )}
                     </div>

                     {totalResults > resultsPerPage && (
                        <div className="flex justify-center mt-6">
                           <ul className="flex space-x-2">
                              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                                 <li key={page}>
                                    <button
                                       onClick={() => handlePageChange(page)}
                                       className={`px-3 py-1 border rounded ${currentPage === page ? "bg-blue-500 text-white" : "bg-white text-blue-500"}`}
                                    >
                                       {page}
                                    </button>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     )}
                  </div>
               )}
            </div>
         </div>

         {/* Filter Drawer */}
         <Drawer anchor="right" open={filterDrawerOpen} onClose={() => toggleFilterDrawer(false)}>
            <div className="w-96 p-4">
               <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Filtres</h2>
                  <IconButton onClick={() => toggleFilterDrawer(false)}>
                     <ShieldCloseIcon />
                  </IconButton>
               </div>

               {/* Filtres de Matériel */}
               <div className="mt-4">
                  <h3 className="text-lg font-bold">Matériel</h3>
                  {materials.length > 0 ? (
                     materials.map((material) => (
                        <div key={material.id} className="mb-4">
                           <div
                              className="flex justify-between items-center cursor-pointer p-2 border rounded-md"
                              onClick={() => toggleMaterialExpansion(material.id)}
                           >
                              <h3 className="font-bold">{material.name}</h3>
                              <span>{expandedMaterialId === material.id ? "-" : "+"}</span>
                           </div>

                           {expandedMaterialId === material.id && (
                              <div className="mt-2 ml-4">
                                 <p className="text-sm text-gray-600">{material.description}</p>
                                 {/* {material.equipment.length > 0 ? (
                                    material.equipment.map((equipment) => (
                                       <label key={equipment.id} className="flex items-center space-x-2 mt-2">
                                          <Checkbox
                                             checked={selectedEquipments.includes(equipment.id)}
                                             onChange={() => handleEquipmentChange(equipment.id)}
                                          />
                                          <span>{`${equipment.brand} - ${equipment.model}`}</span>
                                       </label>
                                    ))
                                 ) : (
                                    <p className="text-sm text-gray-500">Aucun équipement disponible</p>
                                 )} */}
                              </div>
                           )}
                        </div>
                     ))
                  ) : (
                     <p>Chargement des matériaux...</p>
                  )}
               </div>

               {/* Filtres d'Activité */}
               <div className="mt-6">
                  <h3 className="text-lg font-bold">Activité</h3>
                  {activities.length > 0 ? (
                     activities.map((activity) => (
                        <label key={activity.id} className="flex items-center space-x-2 mt-2">
                           <Checkbox
                              checked={selectedActivities.includes(activity.id)}
                              onChange={() => handleActivityChange(activity.id)}
                           />
                           <span>{activity.name}</span>
                        </label>
                     ))
                  ) : (
                     <p>Chargement des activités...</p>
                  )}
               </div>

               {/* Filtres de Styles musicaux */}
               <div className="mt-6">
                  <h3 className="text-lg font-bold">Styles musicaux</h3>
                  {musicStyles.map((style) => (
                     <label key={style} className="flex items-center space-x-2 mt-2">
                        <Checkbox
                           checked={selectedStyles.includes(style)}
                           onChange={() => handleStyleChange(style)}
                        />
                        <span>{style}</span>
                     </label>
                  ))}
               </div>

               {/* Filtres de Localisation */}
               <div className="mt-6">
                  <h3 className="text-lg font-bold">Localisation</h3>
                  <Autocomplete
                     freeSolo
                     options={countries}
                     value={selectedCountry}
                     onChange={handleCountryChange}
                     inputValue={localisation}
                     onInputChange={(event, newValue) => setLocalisation(newValue)}
                     renderInput={(params) => (
                        <TextField {...params} label="Rechercher une localisation" variant="outlined" />
                     )}
                  />
                  {selectedCountry && cities.length > 0 && (
                     <Autocomplete
                        multiple
                        options={cities}
                        value={selectedCities}
                        onChange={(
                           event: React.SyntheticEvent,
                           newValues: string[] | null
                        ) => {
                           handleCitiesChange(event, newValues || []);
                        }}
                        renderInput={(params) => (
                           <TextField {...params} label="Sélectionner des villes" variant="outlined" />
                        )}
                     />
                  )}
               </div>

               {/* Bouton pour appliquer les filtres */}
               <div className="mt-6">
                  <Button variant="contained" color="primary" onClick={applyFilters}>
                     Appliquer les filtres
                  </Button>
               </div>
            </div>
         </Drawer>
         <div>
            {loading ? (
               <CircularProgress />
            ) : (
               <div>
                  {searchResults.length > 0 ? (
                     searchResults.map((result: any, index: number) => (
                        <div key={index}>
                           <h4>{result.name}</h4>
                           {/* Autres détails */}
                        </div>
                     ))
                  ) : (
                     <p>Aucun résultat trouvé</p>
                  )}
               </div>
            )}
         </div>
      </div>
   );
};

export default Search;
