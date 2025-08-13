
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { getEvents } from "@/lib/db";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Events & News</h1>
          <p className="text-muted-foreground mt-2 text-lg">Join us in our parish activities and celebrations.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card key={event.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="p-0">
                <Image src={event.Image || 'https://placehold.co/600x400.png'} alt={event.Title} width={600} height={400} className="w-full h-56 object-cover" data-ai-hint={event.hint} />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="font-headline text-2xl">{event.Title}</CardTitle>
                <div className="flex items-center text-muted-foreground mt-2 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{event.Date}</span>
                </div>
                <CardDescription className="mt-4">{event.Description}</CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button variant="secondary">Add to Calendar</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
