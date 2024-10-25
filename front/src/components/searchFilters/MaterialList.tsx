import { useState, useEffect, useRef } from "react";

// Types pour Material et Equipment
interface Material {
    id: number;
    name: string;
}

interface Equipment {
    id: number;
    brand: string;
    model: string;
}

const MaterialList = () => {
    const [materials, setMaterials] = useState<Material[]>([]); // Liste des matériels
    const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null); // Matériel sélectionné
    const [equipments, setEquipments] = useState<Equipment[]>([]); // Équipements récupérés pour le matériel sélectionné
    const [loading, setLoading] = useState(false); // Indicateur de chargement
    const abortControllerRef = useRef<AbortController | null>(null); // Stocke l'AbortController

    // Fonction pour récupérer les équipements en fonction de l'ID du matériel
    const fetchEquipments = async (materialId: number) => {
        // Annuler la requête en cours si elle existe
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Créer un nouvel AbortController pour la nouvelle requête
        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            setLoading(true); // Affiche un indicateur de chargement

            // Requête API pour récupérer les équipements associés à un matériel
            const response = await fetch(`/api/equipment?material=${materialId}`, {
                signal: controller.signal, // L'AbortController est passé à la requête
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des équipements.");
            }

            const data: Equipment[] = await response.json();
            setEquipments(data); // Mets à jour la liste des équipements
        } catch (error) {
            if (error.name !== "AbortError") {
                // Ignore les erreurs d'annulation
                console.error(error);
            }
        } finally {
            setLoading(false); // Cache l'indicateur de chargement
        }
    };

    // Gestion du clic sur un matériel
    const handleMaterialClick = (material: Material) => {
        setSelectedMaterial(material); // Mets à jour le matériel sélectionné
        fetchEquipments(material.id);  // Récupère les équipements associés
    };

    // Nettoyage du contrôleur lorsque le composant est démonté
    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort(); // Annule la requête en cours lors du démontage
            }
        };
    }, []);

    return (
        <div>
            {/* Liste des matériels */}
            {materials.map((material) => (
                <div
                    key={material.id}
                    className="flex justify-between items-center cursor-pointer p-2 border rounded-md"
                    onClick={() => handleMaterialClick(material)}
                >
                    <h3 className="font-bold">
                        {material.name} - {material.id}
                    </h3>
                </div>
            ))}

            {/* Chargement des équipements */}
            {loading && <p>Chargement des équipements...</p>}

            {/* Affichage des équipements */}
            {!loading && equipments.length > 0 && (
                <div>
                    <h4>Équipements pour {selectedMaterial?.name} :</h4>
                    {equipments.map((equipment) => (
                        <div key={equipment.id}>
                            <span>{equipment.brand} - {equipment.model}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Message si aucun équipement */}
            {!loading && equipments.length === 0 && selectedMaterial && (
                <p>Aucun équipement trouvé pour ce matériel.</p>
            )}
        </div>
    );
};

export default MaterialList;
