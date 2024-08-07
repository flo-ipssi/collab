import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {

  return (
    <div className="flex flex-col min-h-dvh">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary to-primary-foreground">
        <div className="container px-4 md:px-6 flex flex-col items-center justify-center text-center space-y-6">
          <h1 className="text-4xl font-bold text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Experience the Magic of LinkedIn: The Musical
          </h1>
          <p className="max-w-3xl text-lg text-primary-foreground md:text-xl">
            Immerse yourself in the captivating story, mesmerizing melodies, and unforgettable characters of the
            ultimate LinkedIn experience.
          </p>
          <Link
            to={"#"}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"

          >
            Get Tickets
          </Link>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col items-start space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">The Captivating Story</h2>
            <p className="text-muted-foreground md:text-xl">
              Dive into the compelling narrative of LinkedIn: The Musical, where the power of connection and the pursuit
              of professional dreams collide in a symphony of laughter, tears, and unforgettable moments.
            </p>
            <Link
              to={"#"}
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"

            >
              Learn More
            </Link>
          </div>
          <img
            src="https://placehold.co/600x400"
            width="600"
            height="400"
            alt="Story"
            className="mx-auto rounded-xl object-cover"
            style={{ aspectRatio: "600/400", objectFit: "cover" }}
          />
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <img
            src="https://placehold.co/600x400"
            width="600"
            height="400"
            alt="Characters"
            className="mx-auto rounded-xl object-cover"
            style={{ aspectRatio: "600/400", objectFit: "cover" }}
          />
          <div className="flex flex-col items-start space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Meet the Captivating Characters
            </h2>
            <p className="text-muted-foreground md:text-xl">
              Discover the vibrant personalities that bring the world of LinkedIn to life, each with their own unique
              stories, dreams, and struggles that will capture your heart.
            </p>
            <Link
              to={"#"}
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"

            >
              Explore the Cast
            </Link>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col items-start space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Captivating Melodies</h2>
            <p className="text-muted-foreground md:text-xl">
              Prepare to be swept away by the enchanting musical score of LinkedIn: The Musical, where each note and
              lyric weaves a tapestry of emotion, inspiration, and the power of human connection.
            </p>
            <Link
              to={"#"}
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"

            >
              Listen to the Soundtrack
            </Link>
          </div>
          <img
            src="https://placehold.co/600x400"
            width="600"
            height="400"
            alt="Music"
            className="mx-auto rounded-xl object-cover"
            style={{ aspectRatio: "600/400", objectFit: "cover" }}
          />
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <img
            src="https://placehold.co/600x400"
            width="600"
            height="400"
            alt="Production"
            className="mx-auto rounded-xl object-cover"
            style={{ aspectRatio: "600/400", objectFit: "cover" }}
          />
          <div className="flex flex-col items-start space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Exceptional Production</h2>
            <p className="text-muted-foreground md:text-xl">
              Witness the meticulous attention to detail and the seamless integration of state-of-the-art technology
              that bring the world of LinkedIn to life on stage, creating an unforgettable theatrical experience.
            </p>
            <Link
              to={"#"}
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"

            >
              Explore the Production
            </Link>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col items-start space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Hear from Our Attendees</h2>
            <p className="text-muted-foreground md:text-xl">
              Discover what audiences are saying about the captivating experience of LinkedIn: The Musical.
            </p>
          </div>
          <div className="grid gap-6">
            <div className="bg-muted rounded-lg p-6 shadow">
              <blockquote className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://placehold.co/48x48"
                    width={48}
                    height={48}
                    alt="Avatar"
                    className="rounded-full"
                    style={{ aspectRatio: "48/48", objectFit: "cover" }}
                  />
                  <div>
                    <div className="font-medium">John Doe</div>
                    <div className="text-sm text-muted-foreground">Software Engineer</div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "LinkedIn: The Musical is a must-see! The story, the characters, and the music all come together to
                  create an unforgettable experience. I left the theater feeling inspired and connected."
                </p>
              </blockquote>
            </div>
            <div className="bg-muted rounded-lg p-6 shadow">
              <blockquote className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://placehold.co/48x48"
                    width={48}
                    height={48}
                    alt="Avatar"
                    className="rounded-full"
                    style={{ aspectRatio: "48/48", objectFit: "cover" }}
                  />
                  <div>
                    <div className="font-medium">Jane Smith</div>
                    <div className="text-sm text-muted-foreground">Marketing Manager</div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "I was blown away by the production value and the emotional depth of LinkedIn: The Musical. It's a
                  truly unique and captivating experience that everyone in the professional world should see."
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
