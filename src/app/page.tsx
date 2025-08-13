import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, Calendar, Users, HeartHandshake } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const events = [
    { title: "Sunday Mass", date: "Every Sunday, 8:00 AM", image: "https://placehold.co/600x400.png", hint: "church service" },
    { title: "Youth Fellowship", date: "Every Friday, 5:00 PM", image: "https://placehold.co/600x400.png", hint: "group prayer" },
    { title: "Charity Drive", date: "October 28, 2024", image: "https://placehold.co/600x400.png", hint: "community outreach" },
  ];

  const communities = [
    { name: "Catholic Men Association", description: "Fostering spiritual growth and fellowship among men.", image: "https://placehold.co/600x400.png", hint: "men praying" },
    { name: "Catholic Women Association", description: "Empowering women in faith and community service.", image: "https://placehold.co/600x400.png", hint: "women group" },
    { name: "Parish Youth Group", description: "Engaging the next generation in active faith.", image: "https://placehold.co/600x400.png", hint: "youth group" },
  ];

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] bg-black text-white flex items-center justify-center">
        <Image src="/fatima.jpg" alt="Church building" layout="fill" objectFit="cover" className="opacity-40" />
        <div className="relative z-10 text-center p-4">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold">Our Lady of Fatima Kongowea Church</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            Welcome to our parish family. Join us in faith, fellowship, and service.
          </p>
        </div>
      </section>

      <section id="events" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Upcoming Events</h2>
            <p className="text-muted-foreground mt-2 text-lg">Stay connected with our church activities.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="p-0">
                  <Image src={event.image} alt={event.title} width={600} height={400} className="w-full h-48 object-cover" data-ai-hint={event.hint} />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="font-headline text-xl">{event.title}</CardTitle>
                  <div className="flex items-center text-muted-foreground mt-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{event.date}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="link" asChild>
                    <Link href="/events">Learn More <ArrowRight className="w-4 h-4 ml-2" /></Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link href="/events">View All Events</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="communities" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Vibrant Communities</h2>
            <p className="text-muted-foreground mt-2 text-lg">Find your place in our diverse parish groups.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {communities.map((community, index) => (
              <Card key={index} className="text-center flex flex-col items-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={community.image} data-ai-hint={community.hint} />
                  <AvatarFallback><Users className="w-12 h-12 text-muted-foreground" /></AvatarFallback>
                </Avatar>
                <CardTitle className="font-headline text-xl">{community.name}</CardTitle>
                <CardDescription className="mt-2 flex-grow">{community.description}</CardDescription>
                <Button variant="secondary" className="mt-4" asChild>
                  <Link href="/communities">Join Group</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="support" className="py-16 md:py-24 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <HeartHandshake className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Support Our Mission</h2>
            <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">Your generosity helps us continue our work in the community and spread our message of faith and love.</p>
            <Button size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link href="/support">Give Generously</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
