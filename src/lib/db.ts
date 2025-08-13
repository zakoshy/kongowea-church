/**
 * @file This file is a mock database for storing community data.
 * In a real application, this would be replaced with a proper database like Firebase Firestore.
 */
import { db } from './firebase';
import { collection, getDocs, addDoc, doc, setDoc } from 'firebase/firestore';
import type { Community, Event, TeamMember } from './definitions';

export async function getCommunities(): Promise<Community[]> {
  const querySnapshot = await getDocs(collection(db, "communities"));
  const communities: Community[] = [];
  querySnapshot.forEach((doc) => {
    communities.push({ id: doc.id, ...doc.data() } as Community);
  });
  return communities;
}

export async function addCommunity(community: Omit<Community, 'id'>): Promise<void> {
    await addDoc(collection(db, "communities"), community);
}

export async function getEvents(): Promise<Event[]> {
  const querySnapshot = await getDocs(collection(db, "events"));
  const events: Event[] = [];
  querySnapshot.forEach((doc) => {
    events.push({ id: doc.id, ...doc.data() } as Event);
  });
  return events;
}

export async function addEvent(event: Omit<Event, 'id' | 'status'>): Promise<void> {
    const newEvent: Omit<Event, 'id'> = {
        ...event,
        status: 'Published'
    }
    await addDoc(collection(db, "events"), newEvent);
}

export async function getTeamMembers(): Promise<TeamMember[]> {
    const querySnapshot = await getDocs(collection(db, "team"));
    const team: TeamMember[] = [];
    querySnapshot.forEach((doc) => {
        team.push({ id: doc.id, ...doc.data() } as TeamMember);
    });
    return team;
}

export async function addTeamMember(teamMember: Omit<TeamMember, 'id'>): Promise<void> {
    await addDoc(collection(db, "team"), teamMember);
}
