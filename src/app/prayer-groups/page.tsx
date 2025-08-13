
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Users, Phone, User, Search, MapPin, HeartHandshake } from "lucide-react";
import type { PrayerGroup } from '@/lib/definitions';
import { getPrayerGroups } from '@/lib/db';


export default function PrayerGroupsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [prayerGroups, setPrayerGroups] = useState<PrayerGroup[]>([]);

  useEffect(() => {
    async function loadData() {
        const fetchedPrayerGroups = await getPrayerGroups();
        setPrayerGroups(fetchedPrayerGroups);
    }
    loadData();
  }, []);

  const filteredPrayerGroups = useMemo(() => {
    if (!searchTerm) {
      return prayerGroups;
    }
    return prayerGroups.filter(group =>
      group.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, prayerGroups]);

  return (
    <div className="bg-card">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Prayer Groups</h1>
          <p className="text-muted-foreground mt-2 text-lg">Find a group to grow in faith and prayer.</p>
        </div>

        <div className="mb-12 max-w-lg mx-auto">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search for a prayer group..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 text-base"
                />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrayerGroups.map((group, index) => {
            return (
              <Card key={index} className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                 <CardHeader className="flex-row items-center gap-4 pb-4">
                    <HeartHandshake className="w-8 h-8 text-primary" />
                    <CardTitle className="font-headline text-2xl">{group.Name}</CardTitle>
                 </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <div className="border-t pt-4 space-y-2 text-left text-sm">
                      <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          <span className="font-semibold">Members:</span>
                          <span>{group.Members}</span>
                      </div>
                       <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="font-semibold">Location:</span>
                          <span>{group.Location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-primary" />
                          <span className="font-semibold">Leader:</span>
                          <span>{group.Leader}</span>
                      </div>
                       <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-primary" />
                           <span className="font-semibold">Contact:</span>
                          <span>{group.Phone}</span>
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
