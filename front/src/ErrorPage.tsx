import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const ErrorPage: React.FC = () =>  {
  return (
    <div className="flex flex-col text-white items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="space-y-4 text-center">
        <h1 className="text-9xl font-extrabold tracking-tighter animate-pulse">404</h1>
        <h2 className="text-4xl font-bold">Oops! Page not found</h2>
        <p className="text-xl text-muted-foreground max-w-md mx-auto">
          We can't seem to find the page you're looking for. It might have been moved or deleted.
        </p>
        <Button className="mt-8">
          <Link to="/">
            Return to Home
          </Link>
        </Button>
      </div>
      <div className="mt-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="240"
          height="240"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted-foreground animate-bounce"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      </div>
    </div>
  )
}


export default ErrorPage;