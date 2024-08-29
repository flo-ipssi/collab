
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

export interface DataUser {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    website: string;
    profile: {
        avatar?: string | File;
        bio: string;
        facebook: string;
        instagram: string;
        twitter: string;
        spotify: string;
        deezer: string;
        appleMusic: string;
        website: string;
    };
}