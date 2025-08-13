
export type Community = {
    id: string;
    Name: string;
    Leader: string;
    Phone: string;
    Members?: number;
    Location?: string;
}

export type Event = {
    id:string;
    Title: string;
    Date: string;
    Description: string;
    Status?: "Recurring" | "Published" | "Archived" | "Draft";
}

export type TeamMember = {
    id: string;
    Name: string;
    Description: string;
    Image: string;
    hint?: string;
}

export type PrayerGroup = {
    id: string;
    Name: string;
    Leader: string;
    Phone: string;
    Members?: number;
    Location?: string;
}
