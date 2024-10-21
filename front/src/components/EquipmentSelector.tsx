import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    TextField,
    Autocomplete,
    Box,
    CircularProgress,
    Button,
} from "@mui/material";
import { Model } from "../@type/forms";

export default function EquipmentSelector({
    onChange,
}: {
    onChange: (models: Model[]) => void;
}) {
    const [materials, setMaterials] = useState<string[]>([]);
    const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
    const [availableBrands, setAvailableBrands] = useState<string[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [availableModels, setAvailableModels] = useState<Model[]>([]);
    const [selectedModels, setSelectedModels] = useState<Model[]>([]);
    const [addedModels, setAddedModels] = useState<Model[]>([]);
    const [loadingState, setLoadingState] = useState({
        materials: false,
        brands: false,
        models: false,
    });

    // Charger la liste des matériels au début
    useEffect(() => {
        setLoadingState((prev) => ({ ...prev, materials: true }));
        axios
            .get(`http://localhost:8000/api/materials?order[name]=asc`)
            .then((response) => {
                setMaterials(response.data.map((material: any) => material.name));
            })
            .catch((error) => {
                console.error("Erreur lors du chargement des matériels :", error);
            })
            .finally(() => {
                setLoadingState((prev) => ({ ...prev, materials: false }));
            });
    }, []);

    // Charger les marques associées au matériel sélectionné
    useEffect(() => {
        if (selectedMaterial) {
            setLoadingState((prev) => ({ ...prev, brands: true }));
            setAvailableBrands([]);
            setSelectedBrand(null);
            setAvailableModels([]);
            setSelectedModels([]);

            axios
                .get(`http://localhost:8000/api/equipment?material=${selectedMaterial}`)
                .then((response) => {
                    const brands = [
                        ...new Set(response.data.map((equipment: any) => equipment.brand)),
                    ];
                    setAvailableBrands(brands as string[]);
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération des marques:", error);
                })
                .finally(() => {
                    setLoadingState((prev) => ({ ...prev, brands: false }));
                });
        }
    }, [selectedMaterial]);

    // Charger les modèles associés à la marque sélectionnée et au matériel
    useEffect(() => {
        if (selectedMaterial && selectedBrand) {
            setLoadingState((prev) => ({ ...prev, models: true }));

            axios
                .get(
                    `http://localhost:8000/api/equipment?material=${selectedMaterial}&brand=${selectedBrand}`
                )
                .then((response) => {
                    const models = response.data.map((equipment: any) => ({
                        id: equipment.id,
                        model: equipment.model,
                        brand: equipment.brand,
                    }));
                    setAvailableModels(models);
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération des modèles :", error);
                })
                .finally(() => {
                    setLoadingState((prev) => ({ ...prev, models: false }));
                });
        }
    }, [selectedMaterial, selectedBrand]);

    // Fonction de gestion des changements dans le champ des matériels
    const handleMaterialChange = (event: any, value: string | null) => {
        setSelectedMaterial(value);
        setSelectedBrand(null);
        setSelectedModels([]);
    };

    // Fonction de gestion des changements dans le champ des marques
    const handleBrandChange = (event: any, value: string | null) => {
        setSelectedBrand(value);
        setSelectedModels([]);
    };

    // Fonction de gestion des changements dans le champ des modèles
    const handleModelChange = (event: React.SyntheticEvent, values: Model[]) => {
        setSelectedModels(values);
    };

    // Fonction pour ajouter les modèles sélectionnés dans la liste
    const handleAddModels = () => {
        const nonDuplicateModels = selectedModels.filter(
            (selectedModel) =>
                !addedModels.some((addedModel) => addedModel.id === selectedModel.id)
        );

        if (nonDuplicateModels.length > 0) {
            const updatedModels = [...addedModels, ...nonDuplicateModels];
            setAddedModels(updatedModels);
            onChange(updatedModels); // Mettre à jour le parent avec les nouveaux équipements
        }

        // Réinitialiser les sélections
        setSelectedModels([]);
        setSelectedBrand(null);
        setSelectedMaterial(null);
        setAvailableBrands([]);
        setAvailableModels([]);
    };

    return (
        <Box>
            {loadingState.materials ? (
                <div className="text-center">
                    <CircularProgress />
                    <p>Chargement des matériels...</p>
                </div>
            ) : (
                <Autocomplete
                    className="mb-8"
                    value={selectedMaterial}
                    options={materials}
                    onChange={handleMaterialChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Matériel"
                            placeholder="Choisissez un matériel"
                        />
                    )}
                />
            )}

            {selectedMaterial && (
                <Autocomplete
                    className="mb-8"
                    value={selectedBrand}
                    options={availableBrands}
                    onChange={handleBrandChange}
                    disabled={loadingState.brands}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Marque"
                            placeholder="Choisissez une marque"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loadingState.brands ? (
                                            <CircularProgress color="inherit" size={20} />
                                        ) : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                />
            )}

            {selectedBrand && (
                <Autocomplete
                    multiple
                    className="mb-8"
                    value={selectedModels}
                    options={availableModels}
                    getOptionLabel={(option) => option.model}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={handleModelChange}
                    disabled={loadingState.models}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Modèles"
                            placeholder="Choisissez des modèles"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loadingState.models ? (
                                            <CircularProgress color="inherit" size={20} />
                                        ) : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                />
            )}

            {selectedModels.length > 0 && (
                <Box>
                    <h6>Vous avez sélectionné :</h6>
                    {selectedModels.map((model) => (
                        <div key={model.id}>
                            Modèle : {model.model} (ID: {model.id}, Marque: {model.brand})
                        </div>
                    ))}

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddModels}
                        sx={{ mt: 2 }}
                    >
                        Ajouter aux équipements
                    </Button>
                </Box>
            )}

            {addedModels.length > 0 && (
                <Box>
                    <h6>Équipements ajoutés :</h6>
                    {addedModels.map((model) => (
                        <div key={model.id}>
                            Modèle : {model.model} (ID: {model.id}, Marque: {model.brand})
                        </div>
                    ))}
                </Box>
            )}
        </Box>
    );
}
