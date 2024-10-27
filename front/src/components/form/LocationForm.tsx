import React, { useEffect, useState } from "react";
import { TextField, Autocomplete, CircularProgress } from "@mui/material";
import axios from "axios";

interface LocationFormProps {
    formUserData: {
        countrySelected: { label: string } | null;
        citySelected: { label: string } | null;
    };
    setFormUserData: React.Dispatch<
        React.SetStateAction<{
            countrySelected: { label: string } | null;
            citySelected: { label: string } | null;
        }>
    >;
}

const LocationForm: React.FC<LocationFormProps> = ({
    formUserData,
    setFormUserData,
}) => {
    const [countries, setCountries] = useState<{ label: string }[]>([]);
    const [cities, setCities] = useState<{ label: string }[]>([]);
    const [loadingCities, setLoadingCities] = useState(false);

    useEffect(() => {
        // Récupérer les pays depuis l'API
        const fetchCountries = async () => {
            try {
                const response = await axios.get("https://countriesnow.space/api/v0.1/countries");
                setCountries(response.data.data.map((country: any) => ({ label: country.country })));
            } catch (error) {
                console.error("Erreur lors de la récupération des pays:", error);
            }
        };

        fetchCountries();
    }, []);

    const fetchCities = async (country: string) => {
        setLoadingCities(true);
        try {
            const response = await axios.post("https://countriesnow.space/api/v0.1/countries/cities", {
                country,
            });
            setCities(response.data.data.map((city: string) => ({ label: city })));
        } catch (error) {
            console.error("Erreur lors de la récupération des villes:", error);
        } finally {
            setLoadingCities(false);
        }
    };

    const handleAutocompleteChange = (
        event: React.ChangeEvent<{}>,
        value: { label: string } | null,
        field: "countrySelected" | "citySelected"
    ) => {
        setFormUserData((prevState) => ({ ...prevState, [field]: value }));
        if (field === "countrySelected" && value) {
            fetchCities(value.label);
        }
    };

    return (
        <div className="space-y-4">
            <Autocomplete
                options={countries}
                getOptionLabel={(option) => option.label}
                value={formUserData.countrySelected}
                onChange={(event, value) => handleAutocompleteChange(event, value, "countrySelected")}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Country"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
            {formUserData.countrySelected && (
                <Autocomplete
                    options={cities}
                    getOptionLabel={(option) => option.label}
                    value={formUserData.citySelected}
                    onChange={(event, value) => handleAutocompleteChange(event, value, "citySelected")}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="City"
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loadingCities ? <CircularProgress size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                    disabled={!formUserData.countrySelected || loadingCities}
                />
            )}
        </div>
    );
};

export default LocationForm;
