
'use client';

import React from 'react';
import { useActionState } from 'react';
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
import { updateTeamMemberAction, type TeamMemberFormState } from '@/lib/actions';
import { SubmitButton } from '../../new/submit-button';
import { getTeamMember } from '@/lib/db';
import type { TeamMember } from '@/lib/definitions';

export default function EditTeamMemberPage({ params }: { params: { id: string } }) {
  const [member, setMember] = React.useState<TeamMember | null>(null);
  const id = params.id;

  React.useEffect(() => {
    getTeamMember(id).then(setMember);
  }, [id]);

  const initialState: TeamMemberFormState = { message: '' };
  const updateAction = updateTeamMemberAction.bind(null, id);
  const [state, formAction] = useActionState(updateAction, initialState);

  if (!member) {
    return <div>Loading...</div>;
  }

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
                <CardTitle className="font-headline text-3xl">Edit Team Member</CardTitle>
                <CardDescription>
                  Update the details for {member.Name}.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="Name">Full Name</Label>
              <Input id="Name" name="Name" defaultValue={member.Name} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Description">Role</Label>
              <Input id="Description" name="Description" defaultValue={member.Description} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Image">Image URL</Label>
              <Input id="Image" name="Image" defaultValue={member.Image} required />
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
