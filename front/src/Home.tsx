import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {

  return (
    <div className="bg-gradient-to-b from-[#0072b1] to-[#00000] text-white">
    <header className="container mx-auto py-12 px-4 md:py-20 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">COLLAB</h1>
          <p className="text-lg md:text-xl mb-8">
            Explore the world of professional networking like never before in this innovative and captivating musical
            production.
          </p>
          <Link
            to={"#"}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#edc162] text-slate-900 hover:text-white font-medium hover:bg-[#b18800] transition-colors"
            
          >
            Learn More
          </Link>
        </div>
        <div className="hidden md:block">
          <img
            src="https://placehold.co/600x400"
            width={600}
            height={400}
            alt="LinkedIn Musical Hero"
            className="rounded-xl shadow-lg"
            style={{ aspectRatio: "600/400", objectFit: "cover" }}
          />
        </div>
      </div>
    </header>
    <section className="container mx-auto py-12 px-4 md:py-20 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <img
            src="https://placehold.co/600x400"
            width={600}
            height={400}
            alt="LinkedIn Musical Song"
            className="rounded-xl shadow-lg"
            style={{ aspectRatio: "600/400", objectFit: "cover" }}
          />
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Captivating Songs</h2>
          <p className="text-lg md:text-xl mb-8">
            Experience the power of music as you dive into the emotional journey of our characters. Each song is a
            masterpiece that will leave you humming along.
          </p>
          <Link
            to={"#"}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#edc162] text-slate-900 hover:text-white font-medium hover:bg-[#b18800] transition-colors"
          >
            Listen to Samples
          </Link>
        </div>
      </div>
    </section>
    <section className="container mx-auto py-12 px-4 md:py-20 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Vibrant Character Designs</h2>
          <p className="text-lg md:text-xl mb-8">
            Dive into the diverse and captivating characters that bring the world of LinkedIn to life. Each design is
            a work of art, capturing the essence of the professional networking experience.
          </p>
          <Link
            to={"#"}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#edc162] text-slate-900 hover:text-white font-medium hover:bg-[#b18800] transition-colors"
            
          >
            Explore the Characters
          </Link>
        </div>
        <div>
          <img
            src="https://placehold.co/600x400"
            width={600}
            height={400}
            alt="LinkedIn Musical Characters"
            className="rounded-xl shadow-lg"
            style={{ aspectRatio: "600/400", objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
    <section className="container mx-auto py-12 px-4 md:py-20 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <img
            src="https://placehold.co/600x400"
            width={600}
            height={400}
            alt="LinkedIn Musical Behind the Scenes"
            className="rounded-xl shadow-lg"
            style={{ aspectRatio: "600/400", objectFit: "cover" }}
          />
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Exclusive Behind-the-Scenes</h2>
          <p className="text-lg md:text-xl mb-8">
            Get a glimpse into the creative process behind the LinkedIn Musical. Discover the passion and dedication
            of the team as they bring this innovative production to life.
          </p>
          <Link
            to={"#"}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#edc162] text-slate-900 hover:text-white font-medium hover:bg-[#b18800] transition-colors"
            
          >
            Watch the Footage
          </Link>
        </div>
      </div>
    </section>
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 LinkedIn Musical. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link to="#" className="text-xs hover:underline underline-offset-4" >
            Terms of Service
          </Link>
          <Link to="#" className="text-xs hover:underline underline-offset-4" >
            Privacy
          </Link>
        </nav>
      </footer>
  </div>
  );
};


export default Home;
