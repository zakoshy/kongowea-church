import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TeamPage() {
  const teamMembers = [
    { name: "Fr. John Doe", role: "Parish Priest", image: "https://placehold.co/400x400.png", hint: "priest portrait" },
    { name: "Fr. Peter Jones", role: "Assistant Priest", image: "https://placehold.co/400x400.png", hint: "priest smiling" },
    { name: "Jane Smith", role: "Parish Council Chair", image: "https://placehold.co/400x400.png", hint: "woman portrait" },
    { name: "Michael Brown", role: "Youth Coordinator", image: "https://placehold.co/400x400.png", hint: "man portrait" },
    { name: "Susan White", role: "Choir Director", image: "https://placehold.co/400x400.png", hint: "woman smiling" },
    { name: "David Green", role: "CMA Chairman", image: "https://placehold.co/400x400.png", hint: "man formal" },
  ];

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Leadership Team</h1>
          <p className="text-muted-foreground mt-2 text-lg">Meet the dedicated individuals serving our parish.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-primary/20">
                <AvatarImage src={member.image} data-ai-hint={member.hint} />
                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">{member.name}</CardTitle>
                <CardDescription className="text-primary">{member.role}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
