
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

export type Event = {
    id: string;
    title: string;
    date: string;
    description: string;
    image: string;
    hint: string;
    status: "Recurring" | "Published" | "Archived" | "Draft";
}
