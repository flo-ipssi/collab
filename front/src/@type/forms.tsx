
export interface Model {
    id: number;
    model: string;
    brand: string;
}

export interface Equipment {
    id: number;
    type: string;
    brand: string;
    model: string;
}

export interface EquipmentCategory {
    id: number;
    name: string;
    description: string;
    equipment: Equipment[];
}

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
    password: string;
    firstname: string;
    lastname: string;
    username: string;
    citySelected: City | null;
    countrySelected: Country | null;
    professions: Profession[];
    equipments: Model[];
    profileInfos: {
        avatar?: File | null;
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