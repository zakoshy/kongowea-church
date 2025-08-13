'use server';

import { z } from 'zod';
import { generateAnnouncementDraft } from '@/ai/flows/generate-announcement-draft';
import { addCommunity, getCommunities } from '@/lib/db';
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
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    location: z.string().min(3, 'Location must be at least 3 characters long'),
    members: z.coerce.number().min(1, 'There must be at least one member'),
    leaderName: z.string().min(3, 'Leader name must be at least 3 characters long'),
    leaderPhone: z.string().min(10, 'Please enter a valid phone number'),
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
            id: Date.now().toString(),
            name: parsed.data.name,
            location: parsed.data.location,
            members: parsed.data.members,
            leader: {
                name: parsed.data.leaderName,
                phone: parsed.data.leaderPhone,
            }
        });

        revalidatePath('/admin/dashboard/communities');
        revalidatePath('/communities');
        
    } catch(e) {
        return { message: 'Failed to create community.'}
    }

    redirect('/admin/dashboard/communities');
}