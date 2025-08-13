
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Users, Phone, User, Search, MapPin } from "lucide-react";
import type { Community } from '@/lib/definitions';
import { getCommunities } from '@/lib/db';


export default function CommunitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [communities, setCommunities] = useState<Community[]>([]);

  useEffect(() => {
    async function loadData() {
        const fetchedCommunities = await getCommunities();
        setCommunities(fetchedCommunities);
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
            return (
              <Card key={index} className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{community.Name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <div className="border-t pt-4 space-y-2 text-left text-sm">
                      <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          <span className="font-semibold">Members:</span>
                          <span>{community.Members}</span>
                      </div>
                       <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="font-semibold">Location:</span>
                          <span>{community.Location}</span>
                      </div>
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
