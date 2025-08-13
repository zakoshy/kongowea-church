import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Users, Music, HeartHandshake, Shield } from "lucide-react";
import Image from "next/image";

export default function CommunitiesPage() {
  const communities = [
    { name: "Catholic Men Association (CMA)", description: "A brotherhood fostering spiritual growth, leadership, and service among men in the parish.", icon: Shield, image: "https://placehold.co/400x400.png", hint: "men group" },
    { name: "Catholic Women Association (CWA)", description: "Empowering women through faith, fellowship, and charitable works within the community.", icon: Users, image: "https://placehold.co/400x400.png", hint: "women community" },
    { name: "Parish Youth Group", description: "A dynamic group for young parishioners to engage in faith-based activities, service, and fun.", icon: Users, image: "https://placehold.co/400x400.png", hint: "happy youth" },
    { name: "St. Cecilia Choir", description: "Lifting our spirits with angelic voices during Mass and special occasions. New members welcome.", icon: Music, image: "https://placehold.co/400x400.png", hint: "church choir" },
    { name: "St. Vincent de Paul Society", description: "Serving the poor and needy in our community with love and compassion, following Christ's example.", icon: HeartHandshake, image: "https://placehold.co/400x400.png", hint: "charity work" },
    { name: "Legion of Mary", description: "A lay apostolic association of Catholics who, with the sanction of the Church, serve under the banner of Mary.", icon: Shield, image: "https://placehold.co/400x400.png", hint: "prayer group" },
  ];

  return (
    <div className="bg-card">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Vibrant Communities</h1>
          <p className="text-muted-foreground mt-2 text-lg">Find a group to share your faith and talents.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {communities.map((community, index) => {
            const Icon = community.icon;
            return (
              <Card key={index} className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
                 <Avatar className="w-28 h-28 mb-4 border-4 border-primary/20">
                  <AvatarImage src={community.image} data-ai-hint={community.hint} />
                  <AvatarFallback><Icon className="w-12 h-12 text-muted-foreground" /></AvatarFallback>
                </Avatar>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{community.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{community.description}</CardDescription>
                </CardContent>
                <Button variant="outline" className="mt-4">Learn More</Button>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  );
}
