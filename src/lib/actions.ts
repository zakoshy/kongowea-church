'use server';

import { z } from 'zod';
import { generateAnnouncementDraft } from '@/ai/flows/generate-announcement-draft';

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
