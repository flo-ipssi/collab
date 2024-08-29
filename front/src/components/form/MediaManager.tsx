import React, { useState } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

// Définition des types
interface MediaCard {
  id: number;
  cover: string;
  title: string;
  artist: string;
  media: string;
}

interface MediaManagerProps {
  initialCards?: MediaCard[];
  onSave?: (cards: MediaCard[]) => void;
}

export default function MediaManager({ initialCards = [], onSave }: MediaManagerProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingCard, setEditingCard] = useState<MediaCard | null>(null);
  const [cards, setCards] = useState<MediaCard[]>(_.cloneDeep(initialCards)); // Utilisation de cloneDeep pour éviter les références partagées

  const handleAddCard = () => {
    setEditingCard({
      id: Date.now(),
      cover: "/placeholder.svg",
      title: "",
      artist: "",
      media: "",
    });
    setShowModal(true);
  };

  const handleEditCard = (card: MediaCard) => {
    setEditingCard(_.cloneDeep(card)); // Clonage profond pour éviter les modifications directes
    setShowModal(true);
  };

  const handleDeleteCard = (id: number) => {
    const updatedCards = _.cloneDeep(cards);
    _.remove(updatedCards, (card) => card.id === id); // Suppression de la carte
    setCards(updatedCards);
    onSave?.(updatedCards);
  };

  const handleSaveCard = (card: Omit<MediaCard, 'id'>) => {
    const updatedCards = _.cloneDeep(cards);
    if (editingCard) {
      const index = _.findIndex(updatedCards, { id: editingCard.id });
      if (index !== -1) {
        updatedCards[index] = { ...editingCard, ...card };
      } else {
        updatedCards.push({ id: editingCard.id, ...card });
      }
    } else {
      updatedCards.push({ id: Date.now(), ...card });
    }
    setCards(updatedCards);
    onSave?.(updatedCards);
    setEditingCard(null);
    setShowModal(false);
  };

  return (
    <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {cards.map((card) => (
        <div
          key={card.id}
          className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
        >
          <Link
            to="#"
            className="absolute inset-0 z-10 cursor-pointer"
            onClick={() => handleEditCard(card)}
          >
            <span className="sr-only">Edit {card.title}</span>
          </Link>
          <img
            src={card.cover || "/placeholder.svg"}
            alt={`${card.title} album cover`}
            width={500}
            height={500}
            className="h-64 w-full object-cover"
            style={{ aspectRatio: "500/500", objectFit: "cover" }}
          />
          <div className="bg-background p-4">
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="text-muted-foreground">{card.artist}</p>
            <p className="text-muted-foreground">{card.media}</p>
          </div>
          <div className="absolute top-2 right-2 z-20 flex gap-2">
            <button
              className="rounded-full bg-background/50 text-muted-foreground hover:bg-background p-2"
              onClick={() => handleEditCard(card)}
            >
              <FilePenIcon className="h-4 w-4" />
              <span className="sr-only">Edit {card.title}</span>
            </button>
            <button
              className="rounded-full bg-background/50 text-muted-foreground hover:bg-background p-2"
              onClick={() => handleDeleteCard(card.id)}
            >
              <TrashIcon className="h-4 w-4" />
              <span className="sr-only">Delete {card.title}</span>
            </button>
          </div>
        </div>
      ))}
      <button
        className="col-span-1 flex h-64 w-full items-center justify-center rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl bg-secondary text-white"
        onClick={handleAddCard}
      >
        <PlusIcon className="h-8 w-8 text-gray-900" />
        <span className="text-gray-900">Add Music</span>
      </button>
      {showModal && editingCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-w-md bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold">
              {editingCard.id ? `Edit "${editingCard.title}"` : "Add Music"}
            </h2>
            <p className="text-gray-500">
              {editingCard.id ? "Update the album details below." : "Fill out the form to add a new album."}
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleSaveCard({
                  cover: editingCard.cover,
                  title: formData.get("title") as string,
                  artist: formData.get("artist") as string,
                  media: formData.get("media") as string,
                });
              }}
            >
              <div className="grid gap-4">
                <div className="grid gap-1">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    defaultValue={editingCard.title}
                    required
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="grid gap-1">
                  <label htmlFor="artist" className="text-sm font-medium">
                    Artist
                  </label>
                  <input
                    id="artist"
                    name="artist"
                    defaultValue={editingCard.artist}
                    required
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="grid gap-1">
                  <label htmlFor="media" className="text-sm font-medium">
                    Media
                  </label>
                  <input
                    id="media"
                    name="media"
                    defaultValue={editingCard.media}
                    required
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function FilePenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
