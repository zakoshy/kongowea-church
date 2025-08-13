'use client';

import { useActionState, useFormStatus } from 'react-dom';
import { generateDraftAction, type FormState } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Generate Draft
        </>
      )}
    </Button>
  );
}

export default function AnnouncementForm() {
  const initialState: FormState = { message: '' };
  const [state, formAction] = useActionState(generateDraftAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.message !== 'Invalid form data' && !state.draft) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="prompt" className="text-lg font-medium">
          Announcement Prompt
        </Label>
        <Textarea
          id="prompt"
          name="prompt"
          placeholder="e.g., Announce the Christmas midnight mass..."
          rows={5}
          required
          className="text-base"
        />
        {state.issues && (
          <div className="text-sm font-medium text-destructive">
            {state.issues.map((issue) => (
              <p key={issue}>* {issue}</p>
            ))}
          </div>
        )}
      </div>
      <div>
        <SubmitButton />
      </div>

      {state.draft && (
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Generated Draft</CardTitle>
            <CardDescription>Review and edit the draft below. You can copy it to use elsewhere.</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
                value={state.draft}
                readOnly
                rows={10}
                className="bg-background text-base"
             />
          </CardContent>
        </Card>
      )}
    </form>
  );
}
