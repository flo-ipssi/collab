import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteChangeReason } from "@mui/material/Autocomplete";
import { Typography, Box, CircularProgress, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { EquipmentCategory, Model } from "../@type/forms";


export default function EquipmentSelector({ onChange }: { onChange: (models: Model[]) => void }) {
    const [equipmentCategories, setEquipmentCategories] = useState<EquipmentCategory[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
    const [selectedModel, setSelectedModel] = useState<Model[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/materials")
            .then((response) => {
                setEquipmentCategories(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données :", error);
                setIsLoading(false);
            });
    }, []);

    const availableBrands = selectedTypes.length > 0
        ? [
            ...new Set(
                equipmentCategories
                    .filter((category) => selectedTypes.includes(category.name))
                    .flatMap((category) => category.equipment)
                    .map((eq) => eq.brand)
            ),
        ]
        : [];

    const availableModels = selectedBrand.length > 0
        ? equipmentCategories
            .flatMap((category) => category.equipment)
            .filter((eq) => selectedBrand.includes(eq.brand))
            .map((eq) => ({
                id: eq.id,
                model: eq.model,
                brand: eq.brand,
            }))
        : [];

    const handleTypeChange = (event: React.SyntheticEvent, values: string[]) => {
        setSelectedTypes(values);
        setSelectedBrand([]);
        setSelectedModel([]);
    };

    const handleBrandChange = (event: React.SyntheticEvent, values: string[]) => {
        setSelectedBrand(values);
        setSelectedModel([]);
    };

    const handleModelChange = (event: React.SyntheticEvent, values: Model[], reason: AutocompleteChangeReason) => {
        setSelectedModel(values);
        onChange(values);  // Appel de la fonction onChange pour mettre à jour formData
    };

    return (
        <Box>
            {isLoading ? (
                <div className="text-center">
                    <p className="text-center">Chargement de la bibliothèque de métiers </p>
                    <CircularProgress />
                </div>
            ) : (
                <>
                    <Autocomplete
                        className="my-10"
                        multiple
                        options={[...new Set(equipmentCategories.map((category) => category.name))]}
                        onChange={handleTypeChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Type d'équipement"
                                placeholder="Choisissez un type"
                            />
                        )}
                    />

                    {availableBrands.length > 0 && (
                        <Autocomplete
                            multiple
                            options={availableBrands}
                            onChange={handleBrandChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Marque"
                                    placeholder="Choisissez une marque"
                                />
                            )}
                        />
                    )}

                    {availableModels.length > 0 && (
                        <Autocomplete
                            multiple
                            options={availableModels}
                            getOptionLabel={(option) => option.model}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            onChange={handleModelChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Modèle"
                                    placeholder="Choisissez un modèle"
                                />
                            )}
                        />
                    )}

                    {selectedModel.length > 0 && (
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            Vous avez sélectionné :
                            {selectedModel.map((model) => (
                                <div key={model.id}>
                                    Modèle : {model.model} (ID: {model.id}, Marque: {model.brand})
                                </div>
                            ))}
                        </Typography>
                    )}
                </>
            )}
        </Box>
    );
}
