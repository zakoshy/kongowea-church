
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
import { addPrayerGroupAction, type PrayerGroupFormState } from '@/lib/actions';
import { SubmitButton } from './submit-button';


export default function NewPrayerGroupPage() {
    const initialState: PrayerGroupFormState = { message: ''};
    const [state, setState] = useState<PrayerGroupFormState>(initialState);
    const [isPending, startTransition] = useTransition();

    const formAction = (formData: FormData) => {
        startTransition(async () => {
            const newState = await addPrayerGroupAction(initialState, formData);
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                   <Button asChild variant="outline" size="icon">
                       <Link href="/admin/dashboard/prayer-groups">
                          <ArrowLeft className="h-4 w-4" />
                       </Link>
                  </Button>
                  <div>
                      <CardTitle className="font-headline text-3xl">Add New Prayer Group</CardTitle>
                      <CardDescription>
                          Fill in the details below to add a new prayer group.
                      </CardDescription>
                  </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="Name">Group Name</Label>
              <Input id="Name" name="Name" placeholder="e.g., Legion of Mary" required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="Location">Location / Meeting Point</Label>
              <Input id="Location" name="Location" placeholder="e.g., Grotto" required />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="Members">Total Members</Label>
                  <Input id="Members" name="Members" type="number" placeholder="e.g., 20" required />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="Leader">Group Leader</Label>
                    <Input id="Leader" name="Leader" placeholder="e.g., Mary Johnson" required />
                 </div>
             </div>
            <div className="space-y-2">
              <Label htmlFor="Phone">Phone Number</Label>
              <Input id="Phone" name="Phone" type="tel" placeholder="e.g., +254 700 123 456" required />
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
