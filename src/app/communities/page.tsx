
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Users, Music, HeartHandshake, Shield, Phone, User, Search } from "lucide-react";

export default function CommunitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const communities = useMemo(() => [
    { name: "Catholic Men Association (CMA)", description: "A brotherhood fostering spiritual growth, leadership, and service among men in the parish.", icon: Shield, image: "https://placehold.co/400x400.png", hint: "men group", leader: { name: "John Doe", phone: "123-456-7890" } },
    { name: "Catholic Women Association (CWA)", description: "Empowering women through faith, fellowship, and charitable works within the community.", icon: Users, image: "https://placehold.co/400x400.png", hint: "women community", leader: { name: "Jane Smith", phone: "123-456-7891" } },
    { name: "Parish Youth Group", description: "A dynamic group for young parishioners to engage in faith-based activities, service, and fun.", icon: Users, image: "https://placehold.co/400x400.png", hint: "happy youth", leader: { name: "Michael Brown", phone: "123-456-7892" } },
    { name: "St. Cecilia Choir", description: "Lifting our spirits with angelic voices during Mass and special occasions. New members welcome.", icon: Music, image: "https://placehold.co/400x400.png", hint: "church choir", leader: { name: "Susan White", phone: "123-456-7893" } },
    { name: "St. Vincent de Paul Society", description: "Serving the poor and needy in our community with love and compassion, following Christ's example.", icon: HeartHandshake, image: "https://placehold.co/400x400.png", hint: "charity work", leader: { name: "David Green", phone: "123-456-7894" } },
    { name: "Legion of Mary", description: "A lay apostolic association of Catholics who, with the sanction of the Church, serve under the banner of Mary.", icon: Shield, image: "https://placehold.co/400x400.png", hint: "prayer group", leader: { name: "Mary Johnson", phone: "123-456-7895" } },
  ], []);

  const filteredCommunities = useMemo(() => {
    if (!searchTerm) {
      return communities;
    }
    return communities.filter(community =>
      community.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, communities]);

  return (
    <div className="bg-card">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Vibrant Communities</h1>
          <p className="text-muted-foreground mt-2 text-lg">Find a group to share your faith and talents.</p>
        </div>

        <div className="mb-12 max-w-lg mx-auto">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search for a community..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 text-base"
                />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCommunities.map((community, index) => {
            const Icon = community.icon;
            return (
              <Card key={index} className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                 <div className="flex justify-center">
                    <Avatar className="w-28 h-28 mb-4 border-4 border-primary/20">
                      <AvatarImage src={community.image} data-ai-hint={community.hint} />
                      <AvatarFallback><Icon className="w-12 h-12 text-muted-foreground" /></AvatarFallback>
                    </Avatar>
                 </div>
                <CardHeader className="pt-0">
                  <CardTitle className="font-headline text-2xl">{community.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <CardDescription>{community.description}</CardDescription>
                  <div className="border-t pt-4 space-y-2 text-left text-sm">
                      <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-primary" />
                          <span className="font-semibold">Leader:</span>
                          <span>{community.leader.name}</span>
                      </div>
                       <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-primary" />
                           <span className="font-semibold">Contact:</span>
                          <span>{community.leader.phone}</span>
                      </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  );
}
