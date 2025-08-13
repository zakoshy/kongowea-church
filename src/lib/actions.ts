
'use server';

import { z } from 'zod';
import { generateAnnouncementDraft } from '@/ai/flows/generate-announcement-draft';
import { addCommunity, addEvent, addTeamMember } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const announcementSchema = z.object({
  prompt: z.string().min(10, { message: 'Prompt must be at least 10 characters long.' }),
});

export type FormState = {
  message: string;
  draft?: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function generateDraftAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = announcementSchema.safeParse(formData);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => issue.message);
    return {
      message: 'Invalid form data',
      issues,
    };
  }
  
  try {
    const result = await generateAnnouncementDraft({ prompt: parsed.data.prompt });
    if (result.draft) {
      return { message: 'Draft generated successfully.', draft: result.draft };
    } else {
      return { message: 'Failed to generate draft.' };
    }
  } catch (error) {
    return {
      message: 'An unexpected error occurred.',
    };
  }
}

const communitySchema = z.object({
    Name: z.string().min(3, 'Name must be at least 3 characters long'),
    Location: z.string().min(3, 'Location must be at least 3 characters long'),
    Members: z.coerce.number().min(1, 'There must be at least one member'),
    Leader: z.string().min(3, 'Leader name must be at least 3 characters long'),
    Phone: z.string().min(10, 'Please enter a valid phone number'),
});

export type CommunityFormState = {
    message: string;
    issues?: string[];
};


export async function addCommunityAction(prevState: CommunityFormState, data: FormData): Promise<CommunityFormState> {
    const formData = Object.fromEntries(data);
    const parsed = communitySchema.safeParse(formData);

    if (!parsed.success) {
        return {
            message: 'Invalid form data.',
            issues: parsed.error.issues.map(issue => issue.message),
        }
    }

    try {
        await addCommunity({
            Name: parsed.data.Name,
            Location: parsed.data.Location,
            Members: parsed.data.Members,
            Leader: parsed.data.Leader,
            Phone: parsed.data.Phone,
            Description: "A new community group.",
            Image: "https://placehold.co/400x400.png",
            hint: "community group"
        });

        revalidatePath('/admin/dashboard/communities');
        revalidatePath('/communities');
        
    } catch(e) {
        console.error(e);
        return { message: 'Failed to create community.'}
    }

    redirect('/admin/dashboard/communities');
}

const eventSchema = z.object({
    Title: z.string().min(3, 'Title must be at least 3 characters long'),
    Date: z.string().min(3, 'Date must be at least 3 characters long'),
    Description: z.string().min(10, 'Description must be at least 10 characters long'),
});

export type EventFormState = {
    message: string;
    issues?: string[];
};

export async function addEventAction(prevState: EventFormState, data: FormData): Promise<EventFormState> {
    const formData = Object.fromEntries(data);
    const parsed = eventSchema.safeParse(formData);

    if (!parsed.success) {
        return {
            message: 'Invalid form data.',
            issues: parsed.error.issues.map(issue => issue.message),
        }
    }

    try {
        await addEvent({
            Title: parsed.data.Title,
            Date: parsed.data.Date,
            Description: parsed.data.Description,
            Image: 'https://placehold.co/600x400.png', // Default placeholder
            hint: 'church event'
        });

        revalidatePath('/admin/dashboard/events');
        revalidatePath('/events');
        
    } catch(e) {
        console.error(e)
        return { message: 'Failed to create event.'}
    }

    redirect('/admin/dashboard/events');
}

const teamMemberSchema = z.object({
    Name: z.string().min(3, 'Name must be at least 3 characters long.'),
    Description: z.string().min(3, 'Role must be at least 3 characters long.'),
    Image: z.any(),
});

export type TeamMemberFormState = {
    message: string;
    issues?: string[];
};

export async function addTeamMemberAction(prevState: TeamMemberFormState, data: FormData): Promise<TeamMemberFormState> {
    const formData = Object.fromEntries(data);
    const parsed = teamMemberSchema.safeParse(formData);

    if (!parsed.success) {
        return {
            message: 'Invalid form data.',
            issues: parsed.error.issues.map(issue => issue.message),
        };
    }
    
    // This is a placeholder for the file upload logic.
    // In a real app, you would upload the file to a service like Firebase Storage
    // and get a URL back.
    const imageUrl = 'https://placehold.co/400x400.png';


    try {
        await addTeamMember({
            Name: parsed.data.Name,
            Description: parsed.data.Description,
            Image: imageUrl,
            hint: 'person portrait',
        });

        revalidatePath('/admin/dashboard/team');
        revalidatePath('/team');

    } catch (e) {
        console.error(e);
        return { message: 'Failed to create team member.' };
    }

    redirect('/admin/dashboard/team');
}
