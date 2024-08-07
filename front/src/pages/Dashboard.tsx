import React from 'react';
import { useAuth } from '../AuthContext';
// import { Link } from 'react-router-dom';
import CommentIcon from '@material-ui/icons/Comment';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [genreMenuOpen, setGenreMenuOpen] = React.useState(false);
  const [popularityMenuOpen, setPopularityMenuOpen] = React.useState(false);

  const toggleGenreMenu = () => setGenreMenuOpen(!genreMenuOpen);
  const togglePopularityMenu = () => setPopularityMenuOpen(!popularityMenuOpen);

  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 p-6">
      <aside className="bg-gray-100 rounded-lg shadow-lg p-6 space-y-6">
        <div>
          {/* <h4>Welcome, {user?.email}</h4> */}
          <h3 className="text-lg font-semibold mb-2">Suggestions</h3>
          <div className="grid gap-4">
            <a href="#" className="flex items-center gap-3">
              <img src="https://static01.nyt.com/images/2024/04/30/multimedia/30tony-nominations-alicia-keys-fkbz/30tony-nominations-alicia-keys-fkbz-mediumSquareAt3X.jpg" alt="Artiste" className="w-10 h-10 rounded-full" />
              <div>
                <div className="font-medium">Alicia Kheys</div>
                <div className="text-gray-500 text-sm">Musicienne</div>
              </div>
            </a>
            <a href="#" className="flex items-center gap-3">
              <img src="https://st3.depositphotos.com/33173748/36029/i/450/depositphotos_360295830-stock-photo-june-2019-pinkpop-festival-landgraaf.jpg" alt="Artiste" className="w-10 h-10 rounded-full" />
              <div>
                <div className="font-medium">Martin Garrix</div>
                <div className="text-gray-500 text-sm">DJ</div>
              </div>
            </a>
            <a href="#" className="flex items-center gap-3">
              <img src="https://img02.rl0.ru/afisha/e1000x500i/daily.afisha.ru/uploads/images/e/ab/eab404a3b17e6d1406a9053e43e45770.jpg" alt="Label" className="w-10 h-10 rounded-full" />
              <div>
                <div className="font-medium">Sony Music</div>
                <div className="text-gray-500 text-sm">Maison de disques</div>
              </div>
            </a>
            <a href="#" className="flex items-center gap-3">
              <img src="https://img.lapresse.ca/924x615/200912/02/128800-cinquieme-album-garou-gentleman-cambrioleur.jpg" alt="Utilisateur" className="w-10 h-10 rounded-full" />
              <div>
                <div className="font-medium">Garou</div>
                <div className="text-gray-500 text-sm">Mélomane</div>
              </div>
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Tendances</h3>
          <div className="grid gap-2">
            <a href="#" className="flex items-center justify-between">
              <div className="font-medium">Sorties (disques, artites, etc ...)</div>
              <span className="text-white bg-blue-500 rounded-full px-2 py-1 text-xs">+12%</span>
            </a>
            <a href="#" className="flex items-center justify-between">
              <div className="font-medium capitalize">équipements</div>
              <span className="text-white bg-blue-500 rounded-full px-2 py-1 text-xs">+8%</span>
            </a>
            <a href="#" className="flex items-center justify-between">
              <div className="font-medium capitalize">évenements</div>
              <span className="text-white bg-blue-500 rounded-full px-2 py-1 text-xs">+5%</span>
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Filtres</h3>
          <div className="grid gap-4">
            <div>
              <button onClick={toggleGenreMenu} className="flex items-center justify-between w-full bg-white px-4 py-2 rounded-md shadow">
                <span>Genre</span>
                <KeyboardArrowDownIcon className="w-4 h-4" />
              </button>
              {genreMenuOpen && (
                <div className="bg-white mt-2 rounded-md shadow-lg w-48">
                  <label className="flex items-center p-2">
                    <input type="checkbox" className="form-checkbox" checked /> <span className="ml-2">Pop</span>
                  </label>
                  <label className="flex items-center p-2">
                    <input type="checkbox" className="form-checkbox" /> <span className="ml-2">Rock</span>
                  </label>
                  <label className="flex items-center p-2">
                    <input type="checkbox" className="form-checkbox" /> <span className="ml-2">Hip-Hop</span>
                  </label>
                  <label className="flex items-center p-2">
                    <input type="checkbox" className="form-checkbox" /> <span className="ml-2">Électronique</span>
                  </label>
                </div>
              )}
            </div>
            <div>
              <button onClick={togglePopularityMenu} className="flex items-center justify-between w-full bg-white px-4 py-2 rounded-md shadow">
                <span>Popularité</span>
                <KeyboardArrowDownIcon className="w-4 h-4" />
              </button>
              {popularityMenuOpen && (
                <div className="bg-white mt-2 rounded-md shadow-lg w-48">
                  <label className="flex items-center p-2">
                    <input type="checkbox" className="form-checkbox" checked /> <span className="ml-2">Tendance</span>
                  </label>
                  <label className="flex items-center p-2">
                    <input type="checkbox" className="form-checkbox" /> <span className="ml-2">Émergent</span>
                  </label>
                  <label className="flex items-center p-2">
                    <input type="checkbox" className="form-checkbox" /> <span className="ml-2">Classique</span>
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
      <main>
        <div className="bg-gray-100 rounded-lg shadow-lg p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Fil d'actualités</h2>
            <div className="flex items-center gap-4">
              <button className="border border-gray-300 rounded-md px-4 py-2 text-sm">Trier</button>
              <input placeholder="Rechercher..." className="bg-gray-200 rounded-md px-4 py-2 text-sm" />
            </div>
          </div>
          <div className="grid gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-4">
                <img src="https://static01.nyt.com/images/2024/04/30/multimedia/30tony-nominations-alicia-keys-fkbz/30tony-nominations-alicia-keys-fkbz-mediumSquareAt3X.jpg" alt="Artiste" className="w-10 h-10 rounded-full" />
                <div>
                  <div className="font-medium">Alicia Kheys</div>
                  <div className="text-gray-500 text-sm">a publié il y a 2h</div>
                </div>
              </div>
              <div className="mt-4">
                <p>Nouvelle sortie de mon dernier album, n'hésitez pas à l'écouter !</p>
                <div className="mt-4 flex gap-2">
                  <button className="border border-gray-300 rounded-md px-4 py-2 text-sm flex items-center">
                    <FavoriteBorderIcon className="w-4 h-4 mr-2" /> J'aime
                  </button>
                  <button className="border border-gray-300 rounded-md px-4 py-2 text-sm flex items-center">
                    <CommentIcon className="w-4 h-4 mr-2" /> Commenter
                  </button>
                  <button className="border border-gray-300 rounded-md px-4 py-2 text-sm flex items-center">
                    <ShareIcon className="w-4 h-4 mr-2" /> Partager
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
