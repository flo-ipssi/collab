import React, { useEffect, useState } from "react";
import {
   Button,
   Select,
   MenuItem,
   InputLabel,
   FormControl,
   CircularProgress,
} from "@material-ui/core";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";
import LocationForm from "../components/form/LocationForm";
import CardProfileSearch from "../components/CardSearch";

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

   const [formLocationData, setFormLocationData] = useState<{
      countrySelected: { label: string } | null;
      citySelected: { label: string } | null;
   }>({
      countrySelected: null,
      citySelected: null,
   });
   const [searchTerm, setSearchTerm] = useState("");
   const [searchResults, setSearchResults] = useState([]);
   const [loading, setLoading] = useState(false);
   const [totalResults, setTotalResults] = useState(0);
   const [resultsPerPage] = useState(10);
   const [materials, setMaterials] = useState<Material[]>([]);
   const [selectedMaterial, setSelectedMaterial] = useState<number | null>(null);
   const [activities, setActivities] = useState<Activity[]>([]);
   const [selectedActivities, setSelectedActivities] = useState<number[]>([]);
   const musicStyles = ["Rock", "Rap", "Pop", "Reggae"];
   const totalPages = Math.ceil(totalResults / resultsPerPage);

   // Récupérer les résultats de recherche
   const fetchSearchResults = async () => {
      if (searchTerm.length >= 3) {
         setLoading(true);
         try {
            const response = await axios.post(
               "http://localhost:8000/api/search",
               {
                  keyword: searchTerm,
                  localisation: {
                     countrySelected: {
                        label: formLocationData.countrySelected?.label ?? "",
                     },
                     citySelected: {
                        label: formLocationData.citySelected?.label ?? "",
                     },
                  },
                  activities: selectedActivities,
                  material: selectedMaterial,
               },
               {
                  headers: { Authorization: `Bearer ${token}` }
               }
            );
            setSearchResults(response.data.results || []);
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

   useEffect(() => {
      const debounce = (func: Function, delay: number) => {
         let timeoutId: NodeJS.Timeout;
         return (...args: any[]) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
               func(...args);
            }, delay);
         };
      };
      const debouncedFetchSearchResults = debounce(fetchSearchResults, 300);
      debouncedFetchSearchResults(searchTerm);
   }, [searchTerm]);

   const fetchMaterials = async () => {
      try {
         const response = await axios.get("http://localhost:8000/api/materials");
         setMaterials(response.data);
      } catch (error) {
         console.error("Erreur lors de la récupération des matériaux", error);
      }
   };

   const fetchActivities = async () => {
      try {
         const response = await axios.get("http://localhost:8000/api/professions");
         setActivities(response.data);
      } catch (error) {
         console.error("Erreur lors de la récupération des activités", error);
      }
   };

   useEffect(() => {
      fetchMaterials();
      fetchActivities();
   }, []);


   const applyFilters = async () => {
      setLoading(true);
      try {
         const response = await axios.post(
            "http://localhost:8000/api/search",
            {
               keyword: searchTerm,
               localisation: {
                  countrySelected: {
                     label: formLocationData.countrySelected?.label ?? "",
                  },
                  citySelected: {
                     label: formLocationData.citySelected?.label ?? "",
                  },
               },
               activities: selectedActivities,
               material: selectedMaterial,
            },
            {
               headers: { Authorization: `Bearer ${token}` }
            }
         );

         setSearchResults(response.data.results);
      } catch (error) {
         console.error("Erreur lors de la recherche avec filtres", error);
      } finally {
         setLoading(false);
      }
   };


   return (
      <div className="flex-1 gap-6 p-6">
         <div className="bg-gray-100 rounded-lg shadow-lg p-6 space-y-6">
            <div className="flex flex-col gap-4">
               <h2 className="text-lg font-semibold">Recherche</h2>
               <div className="relative flex-1">
                  <input
                     type="search"
                     placeholder="Nom d'utilisateur, nom ou modèle du matériel..."
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="pl-3 w-full border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
               </div>

               <h2 className="text-lg font-semibold">Filtres</h2>
               <div className="grid grid-cols-2 gap-4">
                  <FormControl variant="outlined" fullWidth className="mt-2">
                     <InputLabel id="material-select-label">Matériel</InputLabel>
                     <Select
                        labelId="material-select-label"
                        value={selectedMaterial || ""}
                        onChange={(e) => setSelectedMaterial(e.target.value as number)}
                        label="Matériel"
                     >
                        <MenuItem value="">
                           <em>Aucun</em>
                        </MenuItem>
                        {materials.map((material) => (
                           <MenuItem key={material.id} value={material.id}>
                              {material.name}
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>

                  <FormControl variant="outlined" fullWidth className="mt-2">
                     <InputLabel id="activity-select-label">Activité</InputLabel>
                     <Select
                        labelId="activity-select-label"
                        multiple
                        value={selectedActivities}
                        onChange={(e) =>
                           setSelectedActivities(e.target.value as number[])
                        }
                        label="Activités"
                     >
                        <MenuItem value="" >
                           <em >Aucun</em>
                        </MenuItem>
                        {activities.map((activity) => (
                           <MenuItem key={activity.id} value={activity.id}>
                              {activity.name}
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>
               </div>

               <h2 className="text-lg font-semibold">Localisation</h2>
               <div className="grid grid-cols-2 gap-4">
                  <LocationForm
                     formUserData={formLocationData}
                     setFormUserData={setFormLocationData}
                  />
               </div>

               <Button variant="contained" onClick={() => applyFilters()}>
                  Appliquer les filtres
               </Button>
            </div>
         </div>

         {/* Résultats de recherche */}
         <div className="grid gap-6 mt-6 bg-gray-100 rounded-lg">
            {loading ? (
               <div className="flex justify-center mt-6">
                  <CircularProgress />
               </div>
            ) : (
               <div className="bg-gray-100 rounded-lg shadow-lg p-6 space-y-6 ">
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
                        <p className="text-center col-span-3 text-gray-500">Aucun résultat</p>
                     )}
                  </div>

                  {totalResults > resultsPerPage && (
                     <div className="flex justify-center mt-6">
                        <ul className="flex space-x-2">
                           {Array.from(
                              { length: totalPages },
                              (_, index) => index + 1
                           ).map((page) => (
                              <li key={page}>
                                 <button
                                    className={`px-3 py-1 border rounded ${totalPages === page
                                       ? "bg-blue-500 text-white"
                                       : "bg-white text-blue-500"
                                       }`}
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
   );
};

export default Search;
