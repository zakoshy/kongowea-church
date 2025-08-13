
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
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { addEventAction, type EventFormState } from '@/lib/actions';
import { SubmitButton } from './submit-button';
import { Textarea } from '@/components/ui/textarea';


export default function NewEventPage() {
    const initialState: EventFormState = { message: ''};
    const [state, formAction] = useFormState(addEventAction, initialState);

  return (
    <div className="container mx-auto py-10">
      <form action={formAction}>
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-4">
                <Button asChild variant="outline" size="icon">
                    <Link href="/admin/dashboard/events">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <CardTitle className="font-headline text-3xl">Add New Event</CardTitle>
                    <CardDescription>
                        Fill in the details below to add a new event.
                    </CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="Title">Event Title</Label>
              <Input id="Title" name="Title" placeholder="e.g., Annual Charity Drive" required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="Date">Date & Time</Label>
              <Input id="Date" name="Date" placeholder="e.g., October 28, 2024" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Description">Description</Label>
              <Textarea id="Description" name="Description" placeholder="A short description of the event." required rows={5} />
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
