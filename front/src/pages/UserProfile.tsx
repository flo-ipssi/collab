"use client";
import React, { useState } from "react";
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Input,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";

type MediaItem = {
    id: number;
    type: "image" | "video";
    url: string;
    title: string;
    description: string;
};

type MediaModalProps = {
    type: "image" | "video";
    onAdd: (item: Omit<MediaItem, "id">) => void;
};

function MediaModal({ type, onAdd }: MediaModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (file) {
            // In a real application, you would upload the file here
            // and get back a URL. For now, we'll use a placeholder.
            const url = "https://placehold.co/100x100";
            onAdd({ type, url, title, description });
            setTitle("");
            setDescription("");
            setFile(null);
        }
    };

    return (
        <>
            {/* Bouton de déclenchement */}
            <Button
                onClick={handleClickOpen}
                className="flex items-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
            >
                {type === "image" ? (
                    <svg
                        className="mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 10l-7 7-7-7"
                        />
                    </svg>
                ) : (
                    <svg
                        className="mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                )}
                Add {type === "image" ? "Photo" : "Video"}
            </Button>

            {/* Contenu du dialogue */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle className="text-xl font-semibold text-gray-900">
                    Add {type === "image" ? "Photo" : "Video"}
                </DialogTitle>
                <DialogContent className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <TextField
                                id={`${type}-title`}
                                label="Title"
                                variant="outlined"
                                fullWidth
                                value={title}
                                onChange={(e: {
                                    target: { value: React.SetStateAction<string> };
                                }) => setTitle(e.target.value)}
                                placeholder={`Enter ${type} title`}
                                required
                                className="block w-full"
                            />
                        </div>
                        <div className="space-y-2">
                            <TextField
                                id={`${type}-description`}
                                label="Description"
                                variant="outlined"
                                fullWidth
                                multiline
                                value={description}
                                onChange={(e: {
                                    target: { value: React.SetStateAction<string> };
                                }) => setDescription(e.target.value)}
                                placeholder={`Enter ${type} description`}
                                className="block w-full"
                            />
                        </div>
                        <div className="space-y-2">
                            <input
                                id={`${type}-file`}
                                type="file"
                                accept={type === "image" ? "image/*" : "video/*"}
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                required
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        </div>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="py-2 px-4"
                        >
                            Add {type === "image" ? "Photo" : "Video"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

const UserProfile: React.FC = () => {
    const [name, setName] = useState("John Doe");
    const [email, setEmail] = useState("john.doe@example.com");
    const [bio, setBio] = useState(
        "I am a software developer passionate about creating user-friendly applications."
    );
    const [avatarUrl, setAvatarUrl] = useState("https://placehold.co/100x100");
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([
        {
            id: 1,
            type: "image",
            url: "https://placehold.co/100x100",
            title: "Sample Image",
            description: "A sample image",
        },
        {
            id: 2,
            type: "video",
            url: "https://placehold.co/100x100",
            title: "Sample Video",
            description: "A sample video",
        },
    ]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Profile updated:", {
            name,
            email,
            bio,
            avatarUrl,
            mediaItems,
        });
    };

    const handleAddMedia = (item: Omit<MediaItem, "id">) => {
        const newItem = { ...item, id: Date.now() };
        setMediaItems([...mediaItems, newItem]);
    };

    const handleRemoveMedia = (id: number) => {
        setMediaItems(mediaItems.filter((item) => item.id !== id));
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center text-white">Edit Your Profile</h1>
            <div className="flex flex-col lg:flex-row gap-8">
                <Card className="flex-1">
                    <CardHeader>
                        <p>Personal Information</p>
                        <p>Update your profile details</p>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <Avatar
                                    src={avatarUrl}
                                    alt={name}
                                    className="w-24 h-24 bg-gray-200 text-gray-500"
                                    sx={{ width: "6rem", height: "6rem" }} // Fixe la taille à 24x24 en rem
                                >
                                    {/* Fallback: Afficher une icône si l'image n'est pas chargée */}
                                    {!avatarUrl && (
                                        <PersonIcon className="w-12 h-12 text-gray-400" />
                                    )}
                                </Avatar>
                                <div>
                                    <label htmlFor="avatar" className="text-sm font-medium">
                                        Profile Picture
                                    </label>
                                    <Input
                                        id="avatar"
                                        type="file"
                                        className="mt-1"
                                        // accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onload = (e) =>
                                                    setAvatarUrl(e.target?.result as string);
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="name">Name</label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email">Email</label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="bio">Bio</label>
                                <textarea
                                    id="bio"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Tell us about yourself"
                                    rows={4}
                                />
                            </div>
                        </CardContent>
                        <CardActions>
                            <Button type="submit" className="ml-auto">
                                Save Changes
                            </Button>
                        </CardActions>
                    </form>
                </Card>

                <Card className="flex-1">
                    <CardHeader>
                        <p>Media Gallery</p>
                        <p>Manage your photos and videos</p>
                    </CardHeader>
                    <CardContent>
                        <div className="flex space-x-2 mb-4">
                            <MediaModal type="image" onAdd={handleAddMedia} />
                            <MediaModal type="video" onAdd={handleAddMedia} />
                        </div>
                        <div className="h-[400px] w-full rounded-md border p-4 scroll-auto">
                            <div className="grid grid-cols-2 gap-4">
                                {mediaItems.map((item) => (
                                    <div key={item.id} className="relative group">
                                        <img
                                            src={item.url}
                                            alt={item.title}
                                            className="w-full h-auto rounded-md"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <div className="text-white text-center p-2">
                                                <h3 className="font-bold">{item.title}</h3>
                                                <p className="text-sm">{item.description}</p>
                                            </div>
                                        </div>
                                        <div className="relative group">
                                            {/* Bouton de suppression */}
                                            <IconButton
                                                onClick={() => handleRemoveMedia(item.id)}
                                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white"
                                                size="small"
                                            >
                                                <CloseIcon className="h-4 w-4" />
                                                <span className="sr-only">Remove</span>
                                            </IconButton>

                                            {/* Vérification du type de média */}
                                            {item.type === "video" && (
                                                <>
                                                    <p className="text-white">video</p>
                                                    <PlayCircleFilledIcon className="absolute bottom-2 right-2 h-6 w-6 text-white" />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default UserProfile;
