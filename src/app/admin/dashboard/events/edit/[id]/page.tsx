
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
import { updateEventAction, type EventFormState } from '@/lib/actions';
import { SubmitButton } from '../../new/submit-button';
import { Textarea } from '@/components/ui/textarea';
import { getEvent } from '@/lib/db';
import type { Event } from '@/lib/definitions';


export default function EditEventPage({ params }: { params: { id: string } }) {
    const [event, setEvent] = React.useState<Event | null>(null);
    const id = params.id;

    React.useEffect(() => {
        getEvent(id).then(setEvent);
    }, [id]);

    const initialState: EventFormState = { message: ''};
    const updateAction = updateEventAction.bind(null, id);
    const [state, formAction] = useActionState(updateAction, initialState);

    if (!event) {
        return <div>Loading...</div>;
    }

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
                    <CardTitle className="font-headline text-3xl">Edit Event</CardTitle>
                    <CardDescription>
                        Update the details for {event.Title}.
                    </CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="Title">Event Title</Label>
              <Input id="Title" name="Title" defaultValue={event.Title} required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="Date">Date & Time</Label>
              <Input id="Date" name="Date" defaultValue={event.Date} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Description">Description</Label>
              <Textarea id="Description" name="Description" defaultValue={event.Description} required rows={5} />
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
