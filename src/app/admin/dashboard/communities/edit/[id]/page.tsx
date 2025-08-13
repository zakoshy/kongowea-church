
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
import { updateCommunityAction, type CommunityFormState } from '@/lib/actions';
import { SubmitButton } from '../../../prayer-groups/new/submit-button';
import { getCommunity } from '@/lib/db';
import type { Community } from '@/lib/definitions';


export default function EditCommunityPage({ params }: { params: { id: string } }) {
    const [community, setCommunity] = React.useState<Community | null>(null);

    React.useEffect(() => {
        getCommunity(params.id).then(setCommunity);
    }, [params.id]);

    const initialState: CommunityFormState = { message: ''};
    const updateAction = updateCommunityAction.bind(null, params.id);
    const [state, formAction] = useActionState(updateAction, initialState);

    if (!community) {
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
                       <Link href="/admin/dashboard/communities">
                          <ArrowLeft className="h-4 w-4" />
                       </Link>
                  </Button>
                  <div>
                      <CardTitle className="font-headline text-3xl">Edit Community</CardTitle>
                      <CardDescription>
                          Update the details for {community.Name}.
                      </CardDescription>
                  </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="Name">Community Name</Label>
              <Input id="Name" name="Name" defaultValue={community.Name} required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="Location">Location / Meeting Point</Label>
              <Input id="Location" name="Location" defaultValue={community.Location} required />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="Members">Total Members</Label>
                  <Input id="Members" name="Members" type="number" defaultValue={community.Members} required />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="Leader">Community Head</Label>
                    <Input id="Leader" name="Leader" defaultValue={community.Leader} required />
                 </div>
             </div>
            <div className="space-y-2">
              <Label htmlFor="Phone">Phone Number</Label>
              <Input id="Phone" name="Phone" type="tel" defaultValue={community.Phone} required />
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
