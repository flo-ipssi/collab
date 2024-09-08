"use client";

import { useEffect, useState } from "react";
import "../components.css";
import { DataUser } from "../@type/forms";
import { FaDeezer, FaFacebook, FaInstagram, FaSpotify, FaTwitter } from "react-icons/fa6";
import { SiApplemusic } from "react-icons/si";
import { CgWebsite } from "react-icons/cg";
import ImageUploadForm from "../components/form/ImageUploadForm";
import MediaManager from "../components/form/MediaManager";
import { useAuth } from "../auth/AuthContext";

const UserProfile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState("tab_7_1");
  const [preview, setPreview] = useState<string | undefined>(user?.profile.avatar as string)
  

  const [formValues, setFormValues] = useState<DataUser>({
    username: user?.username || '',
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    email: user?.email || '',
    website: user?.website || '',
    profile: {
      avatar: user?.profile.avatar || '',
      bio: user?.profile.bio || '',
      twitter: user?.profile.twitter || '',
      instagram: user?.profile.instagram || '',
      facebook: user?.profile.facebook || '',
      spotify: user?.profile.spotify || '',
      deezer: user?.profile.deezer || '',
      appleMusic: user?.profile.appleMusic || '',
      website: user?.website || '',
    },
  });

  const initialMediaCards = [
    {
      id: 1,
      cover: "https://placehold.co/185x256",
      title: "Abbey Road",
      artist: "The Beatles",
      media: "Album",
    },
    {
      id: 2,
      cover: "https://placehold.co/185x256",
      title: "Rumours",
      artist: "Fleetwood Mac",
      media: "Album",
    },
    {
      id: 3,
      cover: "https://placehold.co/185x256",
      title: "Nevermind",
      artist: "Nirvana",
      media: "Album",
    },
    {
      id: 4,
      cover: "https://placehold.co/185x256",
      title: "Thriller",
      artist: "Michael Jackson",
      media: "Album",
    },
    {
      id: 5,
      cover: "https://placehold.co/185x256",
      title: "Born to Run",
      artist: "Bruce Springsteen",
      media: "Album",
    },
    {
      id: 6,
      cover: "https://placehold.co/185x256",
      title: "Purple Rain",
      artist: "Prince",
      media: "Album",
    },
  ];

  const [mediaCards, setMediaCards] = useState(initialMediaCards);
  const handleSave = (updatedCards: typeof mediaCards) => {
    setMediaCards(updatedCards);
    console.log("Media cards updated:", updatedCards);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
    setFormValues((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        avatar: file || "",
      },
    }));
  }

  const retriveData = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(formValues);
      alert('User info updated successfully!');
    } catch (error) {
      console.error('Failed to update user info:', error);
    }
  };

  useEffect(() => {
    console.log(user);
    
    retriveData
  }, [])


  return (
    <div className="flex px-6">
      <aside className="w-1/4 bg-gray-100 p-4 mr-5">
        <div className="flex flex-col gap-4">
          <a
            className={`${activeTab === "tab_7_1"
              ? "bg-blue-500 text-white"
              : "text-blue-500 hover:text-white hover:bg-blue-500"
              } px-4 py-2 rounded`}
            onClick={() => setActiveTab("tab_7_1")}
            href="#tab_7_1"
          >
            <i className="ki-outline ki-badge"></i>
            Données personnelles
          </a>
          <a
            className={`${activeTab === "tab_7_2"
              ? "bg-blue-500 text-white"
              : "text-blue-500 hover:text-white hover:bg-blue-500"
              } px-4 py-2 rounded`}
            onClick={() => setActiveTab("tab_7_2")}
            href="#tab_7_2"
          >
            <i className="ki-outline ki-user-square"></i>
            Données artistique
          </a>
          <a
            className={`${activeTab === "tab_7_3"
              ? "bg-blue-500 text-white"
              : "text-blue-500 hover:text-white hover:bg-blue-500"
              } px-4 py-2 rounded`}
            onClick={() => setActiveTab("tab_7_3")}
            href="#tab_7_3"
          >
            <i className="ki-outline ki-calendar"></i>
            Sécurité
          </a>
          <a
            className={`${activeTab === "tab_7_4"
              ? "bg-blue-500 text-white"
              : "text-blue-500 hover:text-white hover:bg-blue-500"
              } px-4 py-2 rounded`}
            onClick={() => setActiveTab("tab_7_4")}
            href="#tab_7_4"
          >
            <i className="ki-outline ki-calendar"></i>
            Médias sociaux
          </a>
        </div>
      </aside>
      <main className="w-3/4 p-4 bg-neutral-200">
        <div
          className={`${activeTab === "tab_7_1" ? "opacity-100" : "opacity-0 hidden"
            } transition-opacity duration-300`}
          id="tab_7_1"
        >
          <h2>Données personnelles</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Nom d'utilisateur
              </label>
              <input
                type="text"
                id="username"
                value={formValues.username}
                name="username"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                Prénom
              </label>
              <input
                type="text"
                id="firstName"
                value={formValues.firstname}
                name="firstName"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Nom
              </label>
              <input
                type="text"
                id="lastName"
                value={formValues.lastname}
                name="lastName"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
          </div>
        </div>
        <div
          className={`${activeTab === "tab_7_2" ? "opacity-100" : "opacity-0 hidden"
            } transition-opacity duration-300`}
          id="tab_7_2"
        >
          <ImageUploadForm handleFileChange={handleFileChange} preview={preview as string} />
          {/* Insertion du composant MediaManager */}
          <MediaManager initialCards={mediaCards} onSave={handleSave} />

        </div>
        <div
          className={`${activeTab === "tab_7_3" ? "opacity-100" : "opacity-0 hidden"
            } transition-opacity duration-300`}
          id="tab_7_3"
        >
          <div className="grid grid-cols-1 gap-4">
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Adresse email
              </label>
              <input
                value={formValues.email}
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                id="conf_password"
                name="conf_password"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Modifier
              </button>
            </div>
          </div>
        </div>
        <div
          className={`${activeTab === "tab_7_4" ? "opacity-100" : "opacity-0 hidden"
            } transition-opacity duration-300`}
          id="tab_7_4"
        >
          <div className="flex mt-4">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <FaFacebook />
            </span>
            <input
              type="text"
              value={user?.profile.facebook}
              id="facebook"
              className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="https://www.facebook.com"
            />
          </div>
          <div className="flex mt-4">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <FaInstagram />
            </span>
            <input
              type="text"
              value={user?.profile.instagram}
              id="instagram"
              className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="https://www.instagram.com/"
            />
          </div>
          <div className="flex mt-4">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <FaTwitter />
            </span>
            <input
              type="text"
              value={user?.profile.twitter}
              id="twitter"
              className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="https://x.com/"
            />
          </div>
          <div className="flex mt-4">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <FaSpotify />
            </span>
            <input
              type="text"
              value={user?.profile.spotify}
              id="spotify"
              className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="https://open.spotify.com"
            />
          </div>
          <div className="flex mt-4">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <FaDeezer />
            </span>
            <input
              type="text"
              value={user?.profile.deezer}
              id="deezer"
              className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="https://www.deezer.com/"
            />
          </div>
          <div className="flex mt-4">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <SiApplemusic />
            </span>
            <input
              type="text"
              value={user?.profile.appleMusic}
              id="appleMusic"
              className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="https://music.apple.com/"
            />
          </div>
          <div className="flex mt-4">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <CgWebsite />
            </span>
            <input
              type="text"
              value={user?.profile.website}
              id="websit"
              className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="https://collab.com"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
