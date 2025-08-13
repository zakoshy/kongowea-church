
'use server';

import { z } from 'zod';
import { generateAnnouncementDraft } from '@/ai/flows/generate-announcement-draft';
import { 
    addCommunity, updateCommunity, deleteCommunity,
    addEvent, updateEvent, deleteEvent,
    addTeamMember, updateTeamMember, deleteTeamMember,
    addPrayerGroup, updatePrayerGroup, deletePrayerGroup
} from '@/lib/db';
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

// Community Actions
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
        await addCommunity(parsed.data);
        revalidatePath('/admin/dashboard/communities');
        revalidatePath('/communities');
    } catch(e) {
        console.error(e);
        return { message: 'Failed to create community.'}
    }

    redirect('/admin/dashboard/communities');
}

export async function updateCommunityAction(id: string, prevState: CommunityFormState, data: FormData): Promise<CommunityFormState> {
    const formData = Object.fromEntries(data);
    const parsed = communitySchema.safeParse(formData);

    if (!parsed.success) {
        return {
            message: 'Invalid form data.',
            issues: parsed.error.issues.map(issue => issue.message),
        }
    }

    try {
        await updateCommunity(id, parsed.data);
        revalidatePath('/admin/dashboard/communities');
        revalidatePath('/communities');
    } catch(e) {
        console.error(e);
        return { message: 'Failed to update community.'}
    }

    redirect('/admin/dashboard/communities');
}

export async function deleteCommunityAction(id: string) {
  try {
    await deleteCommunity(id);
    revalidatePath('/admin/dashboard/communities');
    revalidatePath('/communities');
  } catch (e) {
    console.error(e);
    return { message: 'Failed to delete community.' };
  }
}

// Event Actions
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
        await addEvent(parsed.data);
        revalidatePath('/admin/dashboard/events');
        revalidatePath('/events');
        revalidatePath('/');
    } catch(e) {
        console.error(e)
        return { message: 'Failed to create event.'}
    }

    redirect('/admin/dashboard/events');
}

export async function updateEventAction(id: string, prevState: EventFormState, data: FormData): Promise<EventFormState> {
    const formData = Object.fromEntries(data);
    const parsed = eventSchema.safeParse(formData);

    if (!parsed.success) {
        return {
            message: 'Invalid form data.',
            issues: parsed.error.issues.map(issue => issue.message),
        }
    }

    try {
        await updateEvent(id, parsed.data);
        revalidatePath('/admin/dashboard/events');
        revalidatePath('/events');
        revalidatePath('/');
    } catch(e) {
        console.error(e);
        return { message: 'Failed to update event.'}
    }

    redirect('/admin/dashboard/events');
}

export async function deleteEventAction(id: string) {
  try {
    await deleteEvent(id);
    revalidatePath('/admin/dashboard/events');
    revalidatePath('/events');
    revalidatePath('/');
  } catch (e) {
    console.error(e);
    return { message: 'Failed to delete event.' };
  }
}

// Team Member Actions
const teamMemberSchema = z.object({
    Name: z.string().min(3, 'Name must be at least 3 characters long.'),
    Description: z.string().min(3, 'Role must be at least 3 characters long.'),
    Image: z.string().url('Please enter a valid URL.'),
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
    
    try {
        await addTeamMember({ ...parsed.data, hint: 'person portrait' });
        revalidatePath('/admin/dashboard/team');
        revalidatePath('/team');
    } catch (e) {
        console.error(e);
        return { message: 'Failed to create team member.' };
    }

    redirect('/admin/dashboard/team');
}

export async function updateTeamMemberAction(id: string, prevState: TeamMemberFormState, data: FormData): Promise<TeamMemberFormState> {
    const formData = Object.fromEntries(data);
    const parsed = teamMemberSchema.safeParse(formData);

    if (!parsed.success) {
        return {
            message: 'Invalid form data.',
            issues: parsed.error.issues.map(issue => issue.message),
        };
    }

    try {
        await updateTeamMember(id, parsed.data);
        revalidatePath('/admin/dashboard/team');
        revalidatePath('/team');
    } catch (e) {
        console.error(e);
        return { message: 'Failed to update team member.' };
    }

    redirect('/admin/dashboard/team');
}

export async function deleteTeamMemberAction(id: string) {
  try {
    await deleteTeamMember(id);
    revalidatePath('/admin/dashboard/team');
    revalidatePath('/team');
  } catch (e) {
    console.error(e);
    return { message: 'Failed to delete team member.' };
  }
}

// Prayer Group Actions
const prayerGroupSchema = z.object({
    Name: z.string().min(3, 'Name must be at least 3 characters long'),
    Location: z.string().min(3, 'Location must be at least 3 characters long'),
    Members: z.coerce.number().min(1, 'There must be at least one member'),
    Leader: z.string().min(3, 'Leader name must be at least 3 characters long'),
    Phone: z.string().min(10, 'Please enter a valid phone number'),
});

export type PrayerGroupFormState = {
    message: string;
    issues?: string[];
};

export async function addPrayerGroupAction(prevState: PrayerGroupFormState, data: FormData): Promise<PrayerGroupFormState> {
    const formData = Object.fromEntries(data);
    const parsed = prayerGroupSchema.safeParse(formData);

    if (!parsed.success) {
        return {
            message: 'Invalid form data.',
            issues: parsed.error.issues.map(issue => issue.message),
        }
    }

    try {
        await addPrayerGroup(parsed.data);
        revalidatePath('/admin/dashboard/prayer-groups');
        revalidatePath('/prayer-groups');
    } catch(e) {
        console.error(e);
        return { message: 'Failed to create prayer group.'}
    }

    redirect('/admin/dashboard/prayer-groups');
}

export async function updatePrayerGroupAction(id: string, prevState: PrayerGroupFormState, data: FormData): Promise<PrayerGroupFormState> {
    const formData = Object.fromEntries(data);
    const parsed = prayerGroupSchema.safeParse(formData);

    if (!parsed.success) {
        return {
            message: 'Invalid form data.',
            issues: parsed.error.issues.map(issue => issue.message),
        }
    }

    try {
        await updatePrayerGroup(id, parsed.data);
        revalidatePath('/admin/dashboard/prayer-groups');
        revalidatePath('/prayer-groups');
    } catch(e) {
        console.error(e);
        return { message: 'Failed to update prayer group.'}
    }

    redirect('/admin/dashboard/prayer-groups');
}

export async function deletePrayerGroupAction(id: string) {
  try {
    await deletePrayerGroup(id);
    revalidatePath('/admin/dashboard/prayer-groups');
    revalidatePath('/prayer-groups');
  } catch (e) {
    console.error(e);
    return { message: 'Failed to delete prayer group.' };
  }
}
