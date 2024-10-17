import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Autocomplete, Box, CircularProgress, Pagination } from "@mui/material";
import { Model } from "../@type/forms";

export default function EquipmentSelector({ onChange }: { onChange: (models: Model[]) => void }) {
    const [materials, setMaterials] = useState<string[]>([]);
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
    const [brands, setBrands] = useState<string[]>([]);
    const [abortController, setAbortController] = useState<AbortController | null>(null);
    const [abortBrandController, setAbortBrandController] = useState<AbortController | null>(null);
    const [availableBrands, setAvailableBrands] = useState<string[]>([]);
    const [availableModels, setAvailableModels] = useState<Model[]>([]);

    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [models, setModels] = useState<Model[]>([]);
    const [selectedModels, setSelectedModels] = useState<Model[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingModels, setIsLoadingModels] = useState<boolean>(false);

    const [modelPage, setModelPage] = useState<number>(1);
    const [modelTotalPages, setModelTotalPages] = useState<number>(1);
    const [inputValue, setInputValue] = useState<string>("");

    // Charger la liste des matériels au début
    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`http://localhost:8000/api/materials?order[name]=asc`)
            .then((response) => {
                setMaterials(response.data.map((material: any) => material.name));
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Erreur lors du chargement des matériels :", error);
                setIsLoading(false);
            });
    }, []);

    // Charger les marques associées aux matériels sélectionnés
    useEffect(() => {
        if (selectedMaterials.length > 0) {
            setIsLoading(true);
            axios
                .get(`http://localhost:8000/api/equipment?material=${selectedMaterials.join(",")}`)
                .then((response) => {
                    setBrands([...new Set(response.data.map((eq: any) => eq.brand))]);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Erreur lors du chargement des marques :", error);
                    setIsLoading(false);
                });
        }
    }, [selectedMaterials]);

    // Charger les modèles associés aux marques sélectionnées et à la page
    useEffect(() => {
        if (selectedBrands.length > 0 || inputValue.length > 0) {
            setIsLoadingModels(true);

            // Annuler la requête précédente si elle existe
            if (abortController) {
                abortController.abort();
            }

            // Créer un nouveau AbortController pour la nouvelle requête
            const newAbortController = new AbortController();
            setAbortController(newAbortController);

            // Effectuer la requête avec la pagination et la recherche
            axios.get(`http://localhost:8000/api/equipment?brand=${selectedBrands.join(",")}&model=${inputValue}&page=${modelPage}`, {
                signal: newAbortController.signal,
            })
                .then((response) => {
                    setModels(response.data); // Hydrate les modèles
                    setModelTotalPages(Math.ceil(response.data['hydra:totalItems'] / 10)); // Met à jour le nombre total de pages
                    setIsLoadingModels(false);
                })
                .catch((error) => {
                    if (axios.isCancel(error)) {
                        console.log('Requête de modèles annulée');
                    } else {
                        console.error("Erreur lors du chargement des modèles :", error);
                    }
                    setIsLoadingModels(false);
                });
        }
    }, [selectedBrands, modelPage, inputValue]); // Les dépendances incluent la page, les marques et l'input pour la recherche


    // Fonction de gestion des changements dans le champ des matériels
    const handleMaterialChange = (event: any, values: any[] | ((prevState: string[]) => string[])) => {
        setSelectedMaterials(values);
        setSelectedBrands([]); // Réinitialiser les marques
        setSelectedModels([]); // Réinitialiser les modèles
        setAvailableBrands([]);
        setAvailableModels([]);
    
        if (abortController) {
            abortController.abort(); // Annuler la requête précédente
        }
    
        if (values.length > 0) {
            const newAbortController = new AbortController();
            setAbortController(newAbortController);
    
            // Requête pour récupérer les équipements par matériel et extraire les marques
            axios.get(`http://localhost:8000/api/equipment?material=${values.join(",")}`, {
                signal: newAbortController.signal,
            })
            .then((response) => {
                // Extraire les marques uniques à partir des équipements
                const brands = [...new Set(response.data['hydra:member'].map((eq: { brand: any; }) => eq.brand))];
                setAvailableBrands(brands); // Mettre à jour les marques disponibles
            })
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    console.error("Erreur lors de la récupération des marques:", error);
                }
            });
        }
    };

    // Fonction de gestion des changements dans le champ des marques
    const handleBrandChange = (event: any, values: any[] | ((prevState: string[]) => string[])) => {
        setSelectedBrands(values);
        setSelectedModels([]); // Réinitialiser les modèles
    
        if (abortBrandController) {
            abortBrandController.abort();
        }
    
        if (values.length > 0) {
            const newAbortController = new AbortController();
            setAbortBrandController(newAbortController);
    
            // Requête pour récupérer les équipements par matériel et marque
            axios.get(`http://localhost:8000/api/equipment?material=${selectedMaterials.join(",")}&brand=${values.join(",")}`, {
                signal: newAbortController.signal,
            })
            .then((response) => {
                // Extraire les modèles à partir des équipements
                const models = response.data['hydra:member'].map((eq: { id: any; model: any; brand: any; }) => ({
                    id: eq.id,
                    model: eq.model,
                    brand: eq.brand,
                }));
                setAvailableModels(models); // Mettre à jour les modèles disponibles
            })
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    console.error("Erreur lors de la récupération des modèles:", error);
                }
            });
        } else {
            setAvailableModels([]); // Réinitialiser si aucune marque n'est sélectionnée
        }
    };
    

    // Fonction de gestion des changements dans le champ des modèles
    const handleModelChange = (event: React.SyntheticEvent, values: Model[]) => {
        setSelectedModels(values);
        onChange(values);
    };

    return (
        <Box>
            {!isLoading || materials.length > 0 ? (
                <Autocomplete
                    className="mb-8"
                    multiple
                    value={selectedMaterials}
                    options={materials ?? []}
                    onChange={handleMaterialChange}
                    renderInput={(params) => (
                        <TextField {...params} label="Matériel" placeholder="Choisissez un matériel" />
                    )}
                />
            ) : null}

            {isLoading ? (
                <div className="text-center">
                    <CircularProgress />
                    <p>Chargement...</p>
                </div>
            ) : (
                <>
                    {selectedMaterials.length > 0 && (
                        <Autocomplete
                            className="mb-8"
                            multiple
                            value={selectedBrands}
                            options={brands ?? []}
                            onChange={handleBrandChange}
                            renderInput={(params) => (
                                <TextField {...params} label="Marque" placeholder="Choisissez une marque" />
                            )}
                        />
                    )}

                    {selectedBrands.length > 0 && (
                        <>
                            <Autocomplete
                                className="mb-8"
                                multiple
                                value={selectedModels}
                                options={models ?? []}
                                getOptionLabel={(option) => option.model}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                onChange={handleModelChange}
                                disabled={isLoadingModels}
                                onInputChange={(event, newInputValue) => {
                                    setInputValue(newInputValue);
                                    setModelPage(1);

                                    if (abortController) {
                                        abortController.abort();
                                    }

                                    const newAbortController = new AbortController();
                                    setAbortController(newAbortController);

                                    axios.get(`http://localhost:8000/api/models?name=${newInputValue}`, {
                                        signal: newAbortController.signal,
                                    })
                                        .then((response) => {
                                            setModels(response.data);
                                        })
                                        .catch((error) => {
                                            if (!axios.isCancel(error)) {
                                                console.error("Erreur lors de la récupération des modèles:", error);
                                            }
                                        });
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Modèle"
                                        placeholder="Choisissez un modèle"
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <>
                                                    {isLoadingModels ? <CircularProgress color="inherit" size={20} /> : null}
                                                    {params.InputProps.endAdornment}
                                                </>
                                            ),
                                        }}
                                    />
                                )}
                            />

                            {modelTotalPages > 1 && (
                                <Pagination
                                    count={modelTotalPages} // Nombre total de pages
                                    page={modelPage} // Page actuelle
                                    onChange={(event, value) => setModelPage(value)} // Change la page
                                    sx={{ mt: 2, mb: 2 }}
                                    className="mx-auto"
                                />
                            )}
                        </>
                    )}

                    {selectedModels.length > 0 && (
                        <Box>
                            <h6>Vous avez sélectionné :</h6>
                            {selectedModels.map((model) => (
                                <div key={model.id}>
                                    {model.type} Modèle : {model.model} (ID: {model.id}, Marque: {model.brand})
                                </div>
                            ))}
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
}
