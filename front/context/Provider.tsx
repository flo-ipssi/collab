import { SessionProvider } from "next-auth/react";

interface Props {
    children: any, 
    session: any
}

export default function Provider({children, session}) {
    
    return(
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}