
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Users, Music, HeartHandshake, Shield, Phone, User, Search } from "lucide-react";
import type { Community } from '@/lib/definitions';
import { getCommunities } from '@/lib/db';


export default function CommunitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [communities, setCommunities] = useState<Community[]>([]);

  useEffect(() => {
    async function loadData() {
        const fetchedCommunities = await getCommunities();
        setCommunities(fetchedCommunities.map(c => ({
            ...c,
            // Assign icons dynamically based on name, this is a placeholder logic
            icon: c.Name.includes('Choir') ? Music : 
                  c.Name.includes('Men') ? Shield : 
                  c.Name.includes('Women') ? Users :
                  c.Name.includes('Vincent de Paul') ? HeartHandshake :
                  Users,
            Image: c.Image || `https://placehold.co/400x400.png`,
            hint: 'community group'
        })));
    }
    loadData();
  }, []);

  const filteredCommunities = useMemo(() => {
    if (!searchTerm) {
      return communities;
    }
    return communities.filter(community =>
      community.Name.toLowerCase().includes(searchTerm.toLowerCase())
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
                      <AvatarImage src={community.Image} data-ai-hint={community.hint} />
                      <AvatarFallback>{Icon ? <Icon className="w-12 h-12 text-muted-foreground" /> : null}</AvatarFallback>
                    </Avatar>
                 </div>
                <CardHeader className="pt-0">
                  <CardTitle className="font-headline text-2xl">{community.Name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <CardDescription>{community.Description}</CardDescription>
                  <div className="border-t pt-4 space-y-2 text-left text-sm">
                      <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-primary" />
                          <span className="font-semibold">Leader:</span>
                          <span>{community.Leader}</span>
                      </div>
                       <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-primary" />
                           <span className="font-semibold">Contact:</span>
                          <span>{community.Phone}</span>
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
