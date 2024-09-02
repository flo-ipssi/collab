import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Typography, Box } from '@mui/material';

interface Equipment {
  type: string;
  brand: string;
  model: string;
}

const equipmentData: Equipment[] = [
  { type: 'Micro', brand: 'Shure', model: 'SM58' },
  { type: 'Micro', brand: 'Rode', model: 'NT1-A' },
  { type: 'Guitare', brand: 'Fender', model: 'Stratocaster' },
  { type: 'Guitare', brand: 'Gibson', model: 'Les Paul' },
  // Ajoutez d'autres équipements ici
];

export default function EquipmentSelector() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const availableBrands = selectedTypes.length > 0
    ? [...new Set(equipmentData.filter(eq => selectedTypes.includes(eq.type)).map(eq => eq.brand))]
    : [];

  const availableModels = selectedBrand
    ? equipmentData.filter(eq => eq.brand === selectedBrand).map(eq => eq.model)
    : [];

  const handleTypeChange = (event: React.SyntheticEvent, values: string[]) => {
    setSelectedTypes(values);
    setSelectedBrand(null);
    setSelectedModel(null);
  };

  const handleBrandChange = (event: React.SyntheticEvent, value: string | null) => {
    setSelectedBrand(value);
    setSelectedModel(null);
  };

  const handleModelChange = (event: React.SyntheticEvent, value: string | null) => {
    setSelectedModel(value);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Autocomplete
        multiple
        options={[...new Set(equipmentData.map(eq => eq.type))]}
        onChange={handleTypeChange}
        renderInput={(params) => (
          <TextField {...params} label="Type d'équipement" placeholder="Choisissez un type" />
        )}
      />

      {availableBrands.length > 0 && (
        <Autocomplete
          options={availableBrands}
          value={selectedBrand}
          onChange={handleBrandChange}
          renderInput={(params) => (
            <TextField {...params} label="Marque" placeholder="Choisissez une marque" />
          )}
        />
      )}

      {availableModels.length > 0 && (
        <Autocomplete
          options={availableModels}
          value={selectedModel}
          onChange={handleModelChange}
          renderInput={(params) => (
            <TextField {...params} label="Modèle" placeholder="Choisissez un modèle" />
          )}
        />
      )}

      {selectedModel && (
        <Typography variant="h6" sx={{ mt: 2 }}>
          Vous avez sélectionné : {selectedModel}
        </Typography>
      )}
    </Box>
  );
}
