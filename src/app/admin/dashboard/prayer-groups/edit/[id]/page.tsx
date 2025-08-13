
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
import { updatePrayerGroupAction, type PrayerGroupFormState } from '@/lib/actions';
import { SubmitButton } from '../../new/submit-button';
import { getPrayerGroup } from '@/lib/db';
import type { PrayerGroup } from '@/lib/definitions';


export default function EditPrayerGroupPage({ params }: { params: { id: string } }) {
    const [group, setGroup] = React.useState<PrayerGroup | null>(null);
    const id = params.id;

    React.useEffect(() => {
        getPrayerGroup(id).then(setGroup);
    }, [id]);

    const initialState: PrayerGroupFormState = { message: ''};
    const updateAction = updatePrayerGroupAction.bind(null, id);
    const [state, formAction] = useActionState(updateAction, initialState);

    if (!group) {
        return <div>Loading...</div>;
    }

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
                      <CardTitle className="font-headline text-3xl">Edit Prayer Group</CardTitle>
                      <CardDescription>
                          Update the details for {group.Name}.
                      </CardDescription>
                  </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="Name">Group Name</Label>
              <Input id="Name" name="Name" defaultValue={group.Name} required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="Location">Location / Meeting Point</Label>
              <Input id="Location" name="Location" defaultValue={group.Location} required />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="Members">Total Members</Label>
                  <Input id="Members" name="Members" type="number" defaultValue={group.Members} required />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="Leader">Group Leader</Label>
                    <Input id="Leader" name="Leader" defaultValue={group.Leader} required />
                 </div>
             </div>
            <div className="space-y-2">
              <Label htmlFor="Phone">Phone Number</Label>
              <Input id="Phone" name="Phone" type="tel" defaultValue={group.Phone} required />
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
