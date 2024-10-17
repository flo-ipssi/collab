import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Admin from './components/admin/Admin.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Admin />
    {/* <div className=" mx-auto p-4">
      <HydraAdmin
        entrypoint={entrypoint}
        authProvider={customAuthProvider}  >
        <ResourceGuesser name="materials" list={MaterialList} />
        <ResourceGuesser name="equipment" />
        <ResourceGuesser name="profession" />
      </HydraAdmin>
    </div> */}

  </StrictMode>,
)
