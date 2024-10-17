// import Head from "next/head";
import { useState } from "react";
import { Navigate, Route } from "react-router-dom";
import { CustomRoutes, Resource } from "react-admin";
import {
    fetchHydra as baseFetchHydra,
    HydraAdmin,
    hydraDataProvider as baseHydraDataProvider,
    useIntrospection,
    ResourceGuesser,
} from "@api-platform/admin";
import { parseHydraDocumentation } from "@api-platform/api-doc-parser";
import { ENTRYPOINT } from "../../config/entrypoint";
import authProvider from "../../utils/authProvider";
import MaterialList from "../crud/Materials";
import EquipmentList from "../crud/Equipments";
import ProfessionList from "../crud/Professions";

const getHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const fetchHydra = (url: string, options = {}) =>
    baseFetchHydra(url, {
        ...options,
        headers: getHeaders(),
    });

const RedirectToLogin = () => {
    const introspect = useIntrospection();

    if (localStorage.getItem("token")) {
        introspect();
        return null;
    }
    return <Navigate to="/login" />;
};

const apiDocumentationParser = (setRedirectToLogin: (value: boolean) => void) => async () => {
    try {
        setRedirectToLogin(false);
        return await parseHydraDocumentation(ENTRYPOINT, { headers: getHeaders() });
    } catch (result: any) {
        const { api, response, status } = result;
        if (status !== 401 || !response) {
            throw result;
        }

        localStorage.removeItem("token");
        setRedirectToLogin(true);

        return { api, response, status };
    }
};

const dataProvider = (setRedirectToLogin: (value: boolean) => void) =>
    baseHydraDataProvider({
        entrypoint: ENTRYPOINT,
        httpClient: fetchHydra,
        apiDocumentationParser: apiDocumentationParser(setRedirectToLogin),
    });

const Admin = () => {
    const [redirectToLogin, setRedirectToLogin] = useState(false);

    return (
        <>
            <nav>
                <title>API Platform Admin</title>
            </nav>

            <HydraAdmin
                dataProvider={dataProvider(setRedirectToLogin)}
                authProvider={authProvider}
                entrypoint={ENTRYPOINT}
            >
                {redirectToLogin ? (
                    <CustomRoutes>
                        <Route path="/" element={<RedirectToLogin />} />
                        <Route path="/:any" element={<RedirectToLogin />} />
                    </CustomRoutes>
                ) : (
                    <>
                        <Resource  name="professions" list={ProfessionList} />
                        <Resource  name="materials" list={MaterialList} />
                        <Resource  name="equipment" list={EquipmentList} />
                        {/* <Resource name="material" list={MaterialList} />
              <Resource name="equipment" list={EquipmentList} /> */}
                    </>
                )}
            </HydraAdmin>
        </>
    );
};

export default Admin;
