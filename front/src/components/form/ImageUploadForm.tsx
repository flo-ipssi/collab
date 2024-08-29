"use client";

import { useState, useRef } from "react";
import { UserCircle, Camera } from "lucide-react";
import { FaPen } from "react-icons/fa6";

interface ImageUploadFormProps {
    handleFileChange(event: React.ChangeEvent<HTMLInputElement>): any;
    preview: string;
}

const ImageUploadForm: React.FC<ImageUploadFormProps> = ({
    handleFileChange,
    preview,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <div
                className="relative w-32 h-32 rounded-full overflow-hidden bg-muted cursor-pointer group"
                onClick={triggerFileInput}
            >
                {preview ? (
                    <img
                        src={preview}
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full">
                        <UserCircle className="w-20 h-20 text-muted-foreground" />
                    </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-8 h-8 text-white" />
                </div>
            </div>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="profile-image"
                aria-label="Upload profile image"
            />
        </div>
    );
};

export default ImageUploadForm;
