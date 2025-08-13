
'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { addTeamMemberAction, type TeamMemberFormState } from '@/lib/actions';
import { SubmitButton } from './submit-button';

export default function NewTeamMemberPage() {
  const initialState: TeamMemberFormState = { message: '' };
  const [state, setState] = useState<TeamMemberFormState>(initialState);
  const [isPending, startTransition] = useTransition();

    const formAction = (formData: FormData) => {
        startTransition(async () => {
            const newState = await addTeamMemberAction(initialState, formData);
            if (newState.message) {
                setState(newState);
            }
        });
    };

  return (
    <div className="container mx-auto py-10">
      <form action={formAction}>
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Button asChild variant="outline" size="icon">
                <Link href="/admin/dashboard/team">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <CardTitle className="font-headline text-3xl">Add New Team Member</CardTitle>
                <CardDescription>
                  Fill in the details below to add a new member to the team.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="Name">Full Name</Label>
              <Input id="Name" name="Name" placeholder="e.g., Fr. John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Description">Role</Label>
              <Input id="Description" name="Description" placeholder="e.g., Parish Priest" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Image">Image URL</Label>
              <Input id="Image" name="Image" placeholder="https://example.com/image.png" required />
            </div>
            {state?.issues && (
              <div className="text-sm font-medium text-destructive">
                <p>{state.message}</p>
                <ul className="list-disc list-inside">
                  {state.issues.map((issue) => (
                    <li key={issue}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}
            {state?.message && !state.issues && (
              <div className="text-sm font-medium text-destructive">
                <p>{state.message}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <div className="flex justify-end w-full">
              <SubmitButton />
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
