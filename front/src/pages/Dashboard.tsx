import React from 'react';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <button onClick={logout}>Logout</button>
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="flex-1 relative">
          {/* <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /> */}
          <input
            type="search"
            placeholder="Search for music and artists..."
            className="w-full rounded-lg bg-background pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm">
              {/* <FilterIcon className="w-4 h-4" /> */}
              <span>Job Title</span>
            </button>
          </div>
          <div className="relative">
            <button  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm">
              {/* <MapPinIcon className="w-4 h-4" /> */}
              <span>Location</span>
            </button>
          </div>
          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm">
              {/* <BuildingIcon className="w-4 h-4" /> */}
              <span>Company</span>
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="bg-background rounded-lg shadow-lg overflow-hidden group">
          <Link to={"#"} className="block relative" >
            <img
              src="/placeholder.svg"
              alt="Profile Picture"
              width={300}
              height={300}
              className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity"
              style={{ aspectRatio: "300/300", objectFit: "cover" }}
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button >
                View Profile
              </button>
            </div>
          </Link>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              {/* <Avatar className="w-10 h-10 rounded-full">
                <AvatarImage src="/placeholder-user.jpg" alt="Profile Picture" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar> */}
              <div>
                <div className="font-semibold">John Doe</div>
                <div className="text-sm text-muted-foreground">Music Producer</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Universal Music Group</div>
          </div>
        </div>
        <div className="bg-background rounded-lg shadow-lg overflow-hidden group">
          <Link to={"#"} className="block relative" >
            <img
              src="/placeholder.svg"
              alt="Profile Picture"
              width={300}
              height={300}
              className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity"
              style={{ aspectRatio: "300/300", objectFit: "cover" }}
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button >
                View Profile
              </button>
            </div>
          </Link>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              {/* <Avatar className="w-10 h-10 rounded-full">
                <AvatarImage src="/placeholder-user.jpg" alt="Profile Picture" />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar> */}
              <div>
                <div className="font-semibold">Sarah Anderson</div>
                <div className="text-sm text-muted-foreground">Singer</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Sony Music Entertainment</div>
          </div>
        </div>
        <div className="bg-background rounded-lg shadow-lg overflow-hidden group">
          <Link to={"#"} className="block relative" >
            <img
              src="/placeholder.svg"
              alt="Profile Picture"
              width={300}
              height={300}
              className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity"
              style={{ aspectRatio: "300/300", objectFit: "cover" }}
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button >
                View Profile
              </button>
            </div>
          </Link>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              {/* <Avatar className="w-10 h-10 rounded-full">
                <AvatarImage src="/placeholder-user.jpg" alt="Profile Picture" />
                <AvatarFallback>MJ</AvatarFallback>
              </Avatar> */}
              <div>
                <div className="font-semibold">Michael Jackson</div>
                <div className="text-sm text-muted-foreground">Musician</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Independent Record Label</div>
          </div>
        </div>
        <div className="bg-background rounded-lg shadow-lg overflow-hidden group">
          <Link to={"#"} className="block relative" >
            <img
              src="/placeholder.svg"
              alt="Profile Picture"
              width={300}
              height={300}
              className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity"
              style={{ aspectRatio: "300/300", objectFit: "cover" }}
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button >
                View Profile
              </button>
            </div>
          </Link>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              {/* <Avatar className="w-10 h-10 rounded-full">
                <AvatarImage src="/placeholder-user.jpg" alt="Profile Picture" />
                <AvatarFallback>DJ</AvatarFallback>
              </Avatar> */}
              <div>
                <div className="font-semibold">DJ Khaled</div>
                <div className="text-sm text-muted-foreground">DJ</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Warner Music Group</div>
          </div>
        </div>
        <div className="bg-background rounded-lg shadow-lg overflow-hidden group">
          <Link to={"#"} className="block relative" >
            <img
              src="/placeholder.svg"
              alt="Profile Picture"
              width={300}
              height={300}
              className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity"
              style={{ aspectRatio: "300/300", objectFit: "cover" }}
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button >
                View Profile
              </button>
            </div>
          </Link>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              {/* <Avatar className="w-10 h-10 rounded-full">
                <AvatarImage src="/placeholder-user.jpg" alt="Profile Picture" />
                <AvatarFallback>TS</AvatarFallback>
              </Avatar> */}
              <div>
                <div className="font-semibold">Taylor Swift</div>
                <div className="text-sm text-muted-foreground">Singer</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Independent Record Label</div>
          </div>
        </div>
        <div className="bg-background rounded-lg shadow-lg overflow-hidden group">
          <Link to={"#"} className="block relative" >
            <img
              src="/placeholder.svg"
              alt="Profile Picture"
              width={300}
              height={300}
              className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity"
              style={{ aspectRatio: "300/300", objectFit: "cover" }}
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button >
                View Profile
              </button>
            </div>
          </Link>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              {/* <Avatar className="w-10 h-10 rounded-full">
                <AvatarImage src="/placeholder-user.jpg" alt="Profile Picture" />
                <AvatarFallback>BM</AvatarFallback>
              </Avatar> */}
              <div>
                <div className="font-semibold">Billie Eilish</div>
                <div className="text-sm text-muted-foreground">Singer</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Interscope Records</div>
          </div>
        </div>
        <div className="bg-background rounded-lg shadow-lg overflow-hidden group">
          <Link to={"#"} className="block relative" >
            <img
              src="/placeholder.svg"
              alt="Profile Picture"
              width={300}
              height={300}
              className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity"
              style={{ aspectRatio: "300/300", objectFit: "cover" }}
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button >
                View Profile
              </button>
            </div>
          </Link>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              {/* <Avatar className="w-10 h-10 rounded-full">
                <AvatarImage src="/placeholder-user.jpg" alt="Profile Picture" />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar> */}
              <div>
                <div className="font-semibold">Ariana Grande</div>
                <div className="text-sm text-muted-foreground">Singer</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Universal Music Group</div>
          </div>
        </div>
        <div className="bg-background rounded-lg shadow-lg overflow-hidden group">
          <Link to={"#"} className="block relative" >
            <img
              src="/placeholder.svg"
              alt="Profile Picture"
              width={300}
              height={300}
              className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity"
              style={{ aspectRatio: "300/300", objectFit: "cover" }}
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button >
                View Profile
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
