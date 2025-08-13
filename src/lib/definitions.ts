
export type Community = {
    id: string;
    Name: string; // Changed from name
    Description?: string; // This field is in the app, but might not be in your DB
    icon?: any; // Can be a Lucide icon component
    Image?: string; // This field is in the app, but might not be in your DB
    hint?: string;
    Leader: string; // Changed from leader.name
    Phone: string; // Changed from leader.phone
    Members?: number; // Changed from members
    Location?: string; // Changed from location
}

export type Event = {
    id:string;
    Title: string; // Changed from title
    Date: string; // Changed from date
    Description: string; // Changed from description
    Image?: string; // This field is in the app, but might not be in your DB
    hint?: string;
    Status?: "Recurring" | "Published" | "Archived" | "Draft"; // Changed from status
}

export type TeamMember = {
    id: string;
    Name: string; // Changed from name
    Description: string; // Changed from role
    Image: string; // Changed from image
    hint?: string;
}
