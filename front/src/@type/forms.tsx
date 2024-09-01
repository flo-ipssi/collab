

export interface Country {
    label: string;
    value: string;
}

export interface City {
    label: string;
    value: string;
}
export interface Profession {
    id: number,
    name: string;
    value: string;
}
export interface FormData {
    email: string;
    name: string;
    firstname: string;
    lastname: string;
    username: string;
    photo: File | null;
    city: City | null;
    country: Country | null;
    postalCode: string;
    professions: Profession[];
    materials: string[];
    softwares: string[];
    skills: string[];
    profile: {
        avatar?: string | File;
        bio: string;
        twitter: string;
        instagram: string;
        facebook: string;
        deezer: string;
        spotify: string;
        tidal: string;
        otherPlatforms: string;
    };
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