import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import React, { useState } from "react";

import { Button } from "@material-ui/core";
interface Props { }

const Search: React.FC<Props> = () => {
   // const users = [
   //    {
   //       id: 1,
   //       name: "Alice Johnson",
   //       email: "alice@example.com",
   //       role: "Developer",
   //    },
   //    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Designer" },
   //    {
   //       id: 3,
   //       name: "Charlie Brown",
   //       email: "charlie@example.com",
   //       role: "Manager",
   //    },
   //    {
   //       id: 4,
   //       name: "Diana Prince",
   //       email: "diana@example.com",
   //       role: "Product Owner",
   //    },
   //    {
   //       id: 5,
   //       name: "Ethan Hunt",
   //       email: "ethan@example.com",
   //       role: "QA Engineer",
   //    },
   // ];
   const [searchTerm, setSearchTerm] = useState("");
   // const [anchorEl, setAnchorEl] = useState(null);
   // const [filters, setFilters] = useState({
   //    severity: [],
   //    status: [],
   // });

   const [filterMenuOpen, setFilterMenuOpen] = React.useState(false);
   const [genreMenuOpen, setGenreMenuOpen] = React.useState(false);
   const [popularityMenuOpen, setPopularityMenuOpen] = React.useState(false);

   const toggleFilterMenu = () => setFilterMenuOpen(!filterMenuOpen);
   const togglePopularityMenu = () => setPopularityMenuOpen(!popularityMenuOpen);
   const toggleGenreMenu = () => setGenreMenuOpen(!genreMenuOpen);

   const handleSearchChange = (event: {
      target: { value: React.SetStateAction<string> };
   }) => {
      setSearchTerm(event.target.value);
   };

   // const handleFilterClick = (event: {
   //    currentTarget: React.SetStateAction<null>;
   // }) => {
   //    setAnchorEl(event.currentTarget);
   // };

   // const handleClose = () => {
   //    setAnchorEl(null);
   // };

   // const handleFilterChange = (type: string, value: string) => {
   // setFilters((prevFilters) => {
   //    const newFilters = { ...prevFilters };
   //    if (newFilters[type].includes(value)) {
   //       newFilters[type] = newFilters[type].filter((item: any) => item !== value);
   //    } else {
   //       newFilters[type].push(value);
   //    }
   //    return newFilters;
   // });
   // };
   return (
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 p-6">
         <aside className="bg-gray-100 rounded-lg shadow-lg p-6 space-y-6">
            <div>
               <h3 className="text-lg font-semibold mb-2">Filtres</h3>
               <div className="grid gap-4">
                  <div>
                     <button
                        onClick={toggleGenreMenu}
                        className="flex items-center justify-between w-full bg-white px-4 py-2 rounded-md shadow"
                     >
                        <span>Genre</span>
                        <KeyboardArrowDownIcon className="w-4 h-4" />
                     </button>
                     {genreMenuOpen && (
                        <div className="bg-white mt-2 rounded-md shadow-lg w-48">
                           <label className="flex items-center p-2">
                              <input type="checkbox" className="form-checkbox" />{" "}
                              <span className="ml-2">Pop</span>
                           </label>
                           <label className="flex items-center p-2">
                              <input type="checkbox" className="form-checkbox" />{" "}
                              <span className="ml-2">Rock</span>
                           </label>
                           <label className="flex items-center p-2">
                              <input type="checkbox" className="form-checkbox" />{" "}
                              <span className="ml-2">Hip-Hop</span>
                           </label>
                           <label className="flex items-center p-2">
                              <input type="checkbox" className="form-checkbox" />{" "}
                              <span className="ml-2">Électronique</span>
                           </label>
                        </div>
                     )}
                  </div>
                  <div>
                     <button
                        onClick={togglePopularityMenu}
                        className="flex items-center justify-between w-full bg-white px-4 py-2 rounded-md shadow"
                     >
                        <span>Popularité</span>
                        <KeyboardArrowDownIcon className="w-4 h-4" />
                     </button>
                     {popularityMenuOpen && (
                        <div className="bg-white mt-2 rounded-md shadow-lg w-48">
                           <label className="flex items-center p-2">
                              <input type="checkbox" className="form-checkbox" />{" "}
                              <span className="ml-2">Tendance</span>
                           </label>
                           <label className="flex items-center p-2">
                              <input type="checkbox" className="form-checkbox" />{" "}
                              <span className="ml-2">Émergent</span>
                           </label>
                           <label className="flex items-center p-2">
                              <input type="checkbox" className="form-checkbox" />{" "}
                              <span className="ml-2">Classique</span>
                           </label>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </aside>
         <main>
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

                  <div className="relative inline-block text-left">
                     <div>
                        <button
                           onClick={toggleFilterMenu}
                           className="flex items-center justify-between w-full bg-white px-4 py-2 rounded-md shadow"
                        >
                           <span>Filtrer</span>
                           <KeyboardArrowDownIcon className="w-4 h-4" />
                        </button>
                        {filterMenuOpen && (
                           <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" >
                              <div className="py-1" role="none">
                                 <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="menu-item-0">Account settings</a>
                                 <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="menu-item-1">Support</a>
                                 <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="menu-item-2">License</a>
                                 <form method="POST" action="#" role="none">
                                    <button type="submit" className="block w-full px-4 py-2 text-left text-sm text-gray-700" role="menuitem" id="menu-item-3">Sign out</button>
                                 </form>
                              </div>
                           </div>
                        )}
                     </div>

                  </div>
               </div>

               <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                     <div>
                        <img
                           alt="Politics Story Image"
                           className="w-full h-64 object-cover object-center rounded-lg"
                           height="400"
                           src="https://placehold.co/400x600"
                           width="600"
                           style={{ aspectRatio: "600/400", objectFit: "cover" }}
                        />
                        <h3 className="text-xl font-bold mb-2 mt-4 text-center">
                           John Doe
                        </h3>
                        <div className="text-sm font-bold mb-4 mt-1 text-center">
                           Compositeur
                        </div>
                        <Button className=" text-blue-500 hover:text-blue-700 mt-4 mx-auto ">
                           Voir le profil
                        </Button>
                     </div>
                     <div>
                        <img
                           alt="Politics Story Image"
                           className="w-full h-64 object-cover object-center rounded-lg"
                           height="400"
                           src="https://placehold.co/400x600"
                           width="600"
                           style={{ aspectRatio: "600/400", objectFit: "cover" }}
                        />
                        <h3 className="text-xl font-bold mb-2 mt-4 text-center">
                           John Doe
                        </h3>
                        <div className="text-sm font-bold mb-4 mt-1 text-center">
                           Compositeur
                        </div>
                        <Button className=" text-blue-500 hover:text-blue-700 mt-4 mx-auto">
                           Voir le profil
                        </Button>
                     </div>
                     <div>
                        <img
                           alt="Politics Story Image"
                           className="w-full h-64 object-cover object-center rounded-lg"
                           height="400"
                           src="https://placehold.co/400x600"
                           width="600"
                           style={{ aspectRatio: "600/400", objectFit: "cover" }}
                        />
                        <h3 className="text-xl font-bold mb-2 mt-4 text-center">
                           John Doe
                        </h3>
                        <div className="text-sm font-bold mb-4 mt-1 text-center">
                           Compositeur
                        </div>
                        <Button className=" text-blue-500 hover:text-blue-700 mt-4 mx-auto">
                           Voir le profil
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
         </main>
      </div>
   );
};

export default Search;
