
export type Community = {
    id: string;
    name: string;
    description?: string;
    icon?: any; // Can be a Lucide icon component
    image?: string;
    hint?: string;
    leader: {
        name: string;
        phone: string;
    };
    members?: number;
    location?: string;
}
