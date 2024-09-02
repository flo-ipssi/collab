import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete, {
    AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import { Typography, Box, CircularProgress } from "@mui/material";
import { EquipmentCategory } from "../@type/forms";

export default function EquipmentSelector() {
    const [equipmentCategories, setEquipmentCategories] = useState<EquipmentCategory[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
    const [selectedModel, setSelectedModel] = useState<string[]>([]);
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
        ? [
            ...new Set(
                equipmentCategories
                    .flatMap((category) => category.equipment)
                    .filter((eq) => selectedBrand.includes(eq.brand))
                    .map((eq) => eq.model)
            ),
        ]
        : [];

    const handleTypeChange = (event: React.SyntheticEvent, values: string[]) => {
        setSelectedTypes(values);
        setSelectedBrand([]);
        setSelectedModel([]);
    };

    const handleBrandChange = (event: React.SyntheticEvent, values: string[]) => {
        setSelectedBrand(values);
        setSelectedModel([]);  // Réinitialiser les modèles sélectionnés lors du changement de marque
    };

    const handleModelChange = (event: React.SyntheticEvent, values: string[], reason: AutocompleteChangeReason) => {
        setSelectedModel(values);
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
                                placeholder="Choisissez un équipement"
                            />
                        )}
                    />

                    {availableBrands.length > 0 && (
                        <Autocomplete
                        className="my-10"
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
                            Vous avez sélectionné : {selectedModel.join(', ')}
                        </Typography>
                    )}
                </>
            )}
        </Box>
    );
}
