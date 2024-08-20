
export interface FormData {
    email: string;
    name: string;
    firstname: string;
    username: string;
    photo: File | null;
    city: string;
    biography: string;
    activities: string[];
    materials: string[];
    softwares: string[];
    skills: string[];
    twitter: string;
    instagram: string;
    facebook: string;
    deezer: string;
    spotify: string;
    tidal: string;
    otherPlatforms: string;
}

export type FormDataArrayKeys = 'activities' | 'materials' | 'softwares' | 'skills';
