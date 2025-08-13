'use client';

import { useFormState } from 'react-dom';
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
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { addCommunityAction, type CommunityFormState } from '@/lib/actions';
import { SubmitButton } from './submit-button';


export default function NewCommunityPage() {
    const initialState: CommunityFormState = { message: ''};
    const [state, formAction] = useFormState(addCommunityAction, initialState);

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
                      <CardTitle className="font-headline text-3xl">Add New Community</CardTitle>
                      <CardDescription>
                          Fill in the details below to add a new community to the parish records.
                      </CardDescription>
                  </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Community Name</Label>
              <Input id="name" name="name" placeholder="e.g., Catholic Men Association" required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="location">Location / Meeting Point</Label>
              <Input id="location" name="location" placeholder="e.g., St. Peter's Hall" required />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="members">Total Members</Label>
                  <Input id="members" name="members" type="number" placeholder="e.g., 50" required />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="leaderName">Community Head</Label>
                    <Input id="leaderName" name="leaderName" placeholder="e.g., John Doe" required />
                 </div>
             </div>
            <div className="space-y-2">
              <Label htmlFor="leaderPhone">Phone Number</Label>
              <Input id="leaderPhone" name="leaderPhone" type="tel" placeholder="e.g., +254 700 123 456" required />
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
