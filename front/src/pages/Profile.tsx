import { Card, CardActions, CardContent } from '@material-ui/core';
import { FC, SVGProps } from 'react';
import { Link } from 'react-router-dom';


interface Props { }

const Profile: FC<Props> = ({}) => {
  return (
    <div className="w-full text-white mx-auto ">
      <div className="relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden ">
        <img
          src="https://placehold.co/1920x500"
          alt="Artist Banner"
          className="h-full w-full object-cover object-center"
          width={1920}
          height={500}
          style={{ aspectRatio: "1920/500", objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.6)] flex items-end">
          <div className="p-6 md:p-8 lg:p-10">
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">Amelia Bright</h1>
            <p className="text-lg md:text-xl lg:text-2xl">Electrifying Pop Sensation</p>
          </div>
        </div>
      </div>
      <div className="bg-white text-gray-800 rounded-b-2xl p-6 md:p-8 lg:p-10">
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-3">
          <div className="col-start-1 col-end-3">
            <h2 className="text-2xl font-bold mb-4">About Amelia</h2>
            <p className="text-lg leading-relaxed">
              Amelia Bright is a rising star in the world of pop music. With her captivating vocals, infectious
              melodies, and dynamic stage presence, she has quickly become a fan favorite. Her unique blend of pop,
              R&B, and electronic influences has earned her critical acclaim and a dedicated following.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              Hailing from a small town, Amelia's journey to the top has been one of passion, determination, and
              unwavering creativity. Her music reflects her personal experiences and the challenges she has faced,
              resonating with audiences around the world.
            </p>
          </div>
          <div className="bg-slate-200/80 backdrop-blur-sm p-6 rounded-lg space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg font-bold">Connect with Melody</h2>
              <div className="flex items-center gap-4">
                <Link to="#" className="text-[#1DA1F2] hover:underline">
                  <TwitterIcon className="w-6 h-6" />
                </Link>
                <Link to="#" className="text-[#4267B2] hover:underline">
                  <FacebookIcon className="w-6 h-6" />
                </Link>
                <Link to="#" className="text-[#E1306C] hover:underline">
                  <InstagramIcon className="w-6 h-6" />
                </Link>
                <Link to="#" className="text-[#FF0000] hover:underline">
                  <YoutubeIcon className="w-6 h-6" />
                </Link>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-bold">Streaming</h2>
              <div className="flex items-center gap-4">
                <Link to="#" className="text-[#1DB954] hover:underline">
                  <AirplayIcon className="w-6 h-6" />
                </Link>
                <Link to="#" className="text-[#FF5500] hover:underline">
                  <AppleIcon className="w-6 h-6" />
                </Link>
                <Link to="#" className="text-[#00D8FF] hover:underline">
                  <CloudIcon className="w-6 h-6" />
                </Link>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-bold">Upcoming Events</h2>
              <div className="grid gap-2">
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg">
                  <h3 className="text-lg font-bold">Summer Festival</h3>
                  <p className="text-muted-foreground">June 15, 2024</p>
                  <p className="text-muted-foreground">Outdoor Stage, Main City</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg">
                  <h3 className="text-lg font-bold">Intimate Acoustic Show</h3>
                  <p className="text-muted-foreground">July 20, 2024</p>
                  <p className="text-muted-foreground">Small Theater, Coastal Town</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-12 md:py-24 lg:py-32">
        <div className="container m-auto!">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Oeuvres</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Check out the latest trending music, albums, and playlists on our platform.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-0">
                  <img
                    src="https://placehold.co/400x400"
                    width={400}
                    height={400}
                    alt="Album Cover"
                    className="object-cover aspect-square"
                  />
                </CardContent>
                <CardActions className="p-4">
                  <div className="flex flex-col gap-2">
                    <Link to="#" className="text-lg font-semibold hover:underline">
                      Melodic Waves
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Link to="#" className="hover:underline">
                        John Doe
                      </Link>
                      <span>•</span>
                      <span>Album</span>
                    </div>
                  </div>
                </CardActions>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-0">
                  <img
                    src="https://placehold.co/400x400"
                    width={400}
                    height={400}
                    alt="Album Cover"
                    className="object-cover aspect-square"
                  />
                </CardContent>
                <CardActions className="p-4">
                  <div className="flex flex-col gap-2">
                    <Link to="#" className="text-lg font-semibold hover:underline">
                      Rhythmic Fusion
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Link to="#" className="hover:underline">
                        Jane Smith
                      </Link>
                      <span>•</span>
                      <span>Album</span>
                    </div>
                  </div>
                </CardActions>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-0">
                  <img
                    src="https://placehold.co/400x400"
                    width={400}
                    height={400}
                    alt="Album Cover"
                    className="object-cover aspect-square"
                  />
                </CardContent>
                <CardActions className="p-4">
                  <div className="flex flex-col gap-2">
                    <Link to="#" className="text-lg font-semibold hover:underline">
                      Soulful Harmonies
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Link to="#" className="hover:underline">
                        Michael Johnson
                      </Link>
                      <span>•</span>
                      <span>Playlist</span>
                    </div>
                  </div>
                </CardActions>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-0">
                  <img
                    src="https://placehold.co/400x400"
                    width={400}
                    height={400}
                    alt="Album Cover"
                    className="object-cover aspect-square"
                  />
                </CardContent>
                <CardActions className="p-4">
                  <div className="flex flex-col gap-2">
                    <Link to="#" className="text-lg font-semibold hover:underline">
                      Euphoric Beats
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Link to="#" className="hover:underline">
                        Emily Davis
                      </Link>
                      <span>•</span>
                      <span>Playlist</span>
                    </div>
                  </div>
                </CardActions>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};


function AirplayIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
      <path d="m12 15 5 6H7Z" />
    </svg>
  )
}


function AppleIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
      <path d="M10 2c1 .5 2 2 2 5" />
    </svg>
  )
}


function CloudIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  )
}


function FacebookIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}


function InstagramIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}


function TwitterIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}


function YoutubeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  )
}
export default Profile;