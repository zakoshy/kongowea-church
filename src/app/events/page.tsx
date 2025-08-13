import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Calendar } from "lucide-react";

export default function EventsPage() {
  const events = [
    { title: "Sunday Mass", date: "Every Sunday, 8:00 AM", description: "Join us for our weekly celebration of the Eucharist.", image: "https://placehold.co/600x400.png", hint: "church interior" },
    { title: "Youth Fellowship", date: "Every Friday, 5:00 PM", description: "A gathering for young people to connect, learn, and grow in faith.", image: "https://placehold.co/600x400.png", hint: "youth praying" },
    { title: "Annual Charity Drive", date: "October 28, 2024", description: "Our annual drive to support the less fortunate in our community.", image: "https://placehold.co/600x400.png", hint: "community support" },
    { title: "Parish Pastoral Council Meeting", date: "November 5, 2024", description: "Monthly meeting for the PPC to discuss parish matters.", image: "https://placehold.co/600x400.png", hint: "meeting discussion" },
    { title: "Choir Practice", date: "Every Tuesday & Thursday, 6:00 PM", description: "Join our talented choir to prepare for Sunday service.", image: "https://placehold.co/600x400.png", hint: "choir singing" },
    { title: "Advent Retreat", date: "December 1-3, 2024", description: "A spiritual retreat to prepare our hearts for the coming of Christ.", image: "https://placehold.co/600x400.png", hint: "peaceful retreat" },
  ];

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Events & News</h1>
          <p className="text-muted-foreground mt-2 text-lg">Join us in our parish activities and celebrations.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <Card key={index} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="p-0">
                <Image src={event.image} alt={event.title} width={600} height={400} className="w-full h-56 object-cover" data-ai-hint={event.hint} />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="font-headline text-2xl">{event.title}</CardTitle>
                <div className="flex items-center text-muted-foreground mt-2 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{event.date}</span>
                </div>
                <CardDescription className="mt-4">{event.description}</CardDescription>
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
