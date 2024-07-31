import { Button } from "@/components/ui/button";
import Link from "next/link"
import { JSX, SVGProps } from "react";
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#f8f8f8]">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-white shadow-sm">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Music2Icon className="h-6 w-6 text-primary" />
          <span className="sr-only">Social Media Musical</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4 text-primary-foreground"
            prefetch={false}
          >
            Features
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4 text-primary-foreground"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4 text-primary-foreground"
            prefetch={false}
          >
            Contact
          </Link>
          <Link href='/login' className="text-sm font-medium">
            Login
          </Link>
          <Link href='/register' className="text-sm font-medium">
            Subscribe
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative w-full h-[80vh] bg-muted overflow-hidden bg-dark-900">
          <img src={`/background/audience.jpg`} alt="Hero Image" className="object-cover object-center" />
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex flex-col items-center justify-center px-4 md:px-6 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl">
                COLLAB
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl text-white" >
                Acme Building Co. is a leading construction firm dedicated to delivering high-quality, innovative
                building solutions.
              </p>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 flex flex-col items-center justify-center text-center space-y-6">
            <div className="max-w-[700px] space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">Social Media Integration</h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Immerse yourself in the story by interacting with the characters through social media platforms. Your
                actions and reactions will shape the narrative in real-time.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center justify-center space-y-4">
                <TwitterIcon className="h-12 w-12 text-primary" />
                <h3 className="text-2xl font-bold text-primary">Twitter</h3>
                <p className="text-muted-foreground">
                  Follow the characters, share your thoughts, and engage in real-time conversations.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4">
                <InstagramIcon className="h-12 w-12 text-primary" />
                <h3 className="text-2xl font-bold text-primary">Instagram</h3>
                <p className="text-muted-foreground">
                  Explore the characters' lives through their social media posts and stories.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4">
                <TwitterIcon className="h-12 w-12 text-primary" />
                <h3 className="text-2xl font-bold text-primary">TikTok</h3>
                <p className="text-muted-foreground">
                  Participate in viral dance challenges and share your own performances.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6 flex flex-col items-center justify-center text-center space-y-6">
            <div className="max-w-[700px] space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">Animated Characters</h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Discover a cast of vibrant and expressive characters that come to life through stunning 2D and 3D
                animations. Each character has a unique personality that shines through their movements and
                interactions.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-full aspect-square bg-[url('/character1.png')] bg-cover bg-center rounded-lg shadow-lg animate-float" />
                <h3 className="text-2xl font-bold text-primary">Melody</h3>
                <p className="text-muted-foreground">
                  The charismatic lead of the musical, Melody navigates the world of social media with grace and
                  authenticity.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-full aspect-square bg-[url('/character2.png')] bg-cover bg-center rounded-lg shadow-lg animate-float" />
                <h3 className="text-2xl font-bold text-primary">Rhythm</h3>
                <p className="text-muted-foreground">
                  Rhythm, the energetic best friend, brings a playful and infectious energy to the musical\'s social
                  media presence.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-full aspect-square bg-[url('/character3.png')] bg-cover bg-center rounded-lg shadow-lg animate-float" />
                <h3 className="text-2xl font-bold text-primary">Harmony</h3>
                <p className="text-muted-foreground">
                  Harmony, the wise and thoughtful mentor, guides the characters through the complexities of social
                  media and personal growth.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 flex flex-col items-center justify-center text-center space-y-6">
            <div className="max-w-[700px] space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">Smooth Transitions</h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Experience a seamless flow between scenes as the characters navigate the digital world. Innovative
                transitions and micro-interactions create a captivating and immersive experience.
              </p>
            </div>
            <div className="w-full max-w-4xl">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                <video autoPlay loop muted className="w-full h-full object-cover">
                  <source src="/transition-video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayIcon className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Users Say</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from real people who have found success and joy on our platform.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              <Card className="border-0 shadow-none">
                <CardContent className="p-6 text-left">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-10 h-10 border">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>AC</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-bold">John Doe</div>
                        <div className="text-sm text-muted-foreground">@johndoe</div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      "I've been using this social media platform for a year now, and it's been a game-changer for my
                      business. The tools and features have helped me grow my audience and engage with my followers in a
                      meaningful way."
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-none">
                <CardContent className="p-6 text-left">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-10 h-10 border">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>AC</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-bold">Jane Smith</div>
                        <div className="text-sm text-muted-foreground">@janesmith</div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      "I love how easy it is to connect with like-minded people on this platform. The community is so
                      supportive, and I've made some amazing friends that I wouldn't have met otherwise."
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-none">
                <CardContent className="p-6 text-left">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-10 h-10 border">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>AC</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-bold">Michael Johnson</div>
                        <div className="text-sm text-muted-foreground">@michaelj</div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      "This social media platform has completely transformed the way I share my creative work. The
                      analytics and monetization tools have helped me turn my passion into a sustainable career."
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Social Media Musical. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
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


function Music2Icon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <circle cx="8" cy="18" r="4" />
      <path d="M12 18V2l7 4" />
    </svg>
  )
}


function PlayIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <polygon points="6 3 20 12 6 21 6 3" />
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


function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}