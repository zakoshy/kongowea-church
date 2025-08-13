/**
 * @file This file is a mock database for storing community data.
 * In a real application, this would be replaced with a proper database like Firebase Firestore.
 */
import { db } from './firebase';
import { collection, getDocs, addDoc, doc, setDoc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';
import type { Community, Event, TeamMember, PrayerGroup } from './definitions';

// Communities
export async function getCommunities(): Promise<Community[]> {
  const querySnapshot = await getDocs(collection(db, "communities"));
  const communities: Community[] = [];
  querySnapshot.forEach((doc) => {
    communities.push({ id: doc.id, ...doc.data() } as Community);
  });
  return communities;
}

export async function getCommunity(id: string): Promise<Community | null> {
    const docRef = doc(db, "communities", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Community;
    } else {
        return null;
    }
}

export async function addCommunity(community: Omit<Community, 'id'>): Promise<void> {
    await addDoc(collection(db, "communities"), community);
}

export async function updateCommunity(id: string, community: Partial<Omit<Community, 'id'>>): Promise<void> {
    const docRef = doc(db, "communities", id);
    await updateDoc(docRef, community);
}

export async function deleteCommunity(id: string): Promise<void> {
    await deleteDoc(doc(db, "communities", id));
}

// Events
export async function getEvents(): Promise<Event[]> {
  const querySnapshot = await getDocs(collection(db, "events"));
  const events: Event[] = [];
  querySnapshot.forEach((doc) => {
    events.push({ id: doc.id, ...doc.data() } as Event);
  });
  return events;
}

export async function getEvent(id: string): Promise<Event | null> {
    const docRef = doc(db, "events", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Event;
    } else {
        return null;
    }
}

export async function addEvent(event: Omit<Event, 'id' | 'Status'>): Promise<void> {
    const newEvent: Omit<Event, 'id'> = {
        ...event,
        Status: 'Published'
    }
    await addDoc(collection(db, "events"), newEvent);
}

export async function updateEvent(id: string, event: Partial<Omit<Event, 'id'>>): Promise<void> {
    const docRef = doc(db, "events", id);
    await updateDoc(docRef, event);
}

export async function deleteEvent(id: string): Promise<void> {
    await deleteDoc(doc(db, "events", id));
}

// Team Members
export async function getTeamMembers(): Promise<TeamMember[]> {
    const querySnapshot = await getDocs(collection(db, "team"));
    const team: TeamMember[] = [];
    querySnapshot.forEach((doc) => {
        team.push({ id: doc.id, ...doc.data() } as TeamMember);
    });
    return team;
}

export async function getTeamMember(id: string): Promise<TeamMember | null> {
    const docRef = doc(db, "team", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as TeamMember;
    } else {
        return null;
    }
}

export async function addTeamMember(teamMember: Omit<TeamMember, 'id'>): Promise<void> {
    await addDoc(collection(db, "team"), teamMember);
}

export async function updateTeamMember(id: string, teamMember: Partial<Omit<TeamMember, 'id'>>): Promise<void> {
    const docRef = doc(db, "team", id);
    await updateDoc(docRef, teamMember);
}

export async function deleteTeamMember(id: string): Promise<void> {
    await deleteDoc(doc(db, "team", id));
}

// Prayer Groups
export async function getPrayerGroups(): Promise<PrayerGroup[]> {
  const querySnapshot = await getDocs(collection(db, "prayer-groups"));
  const prayerGroups: PrayerGroup[] = [];
  querySnapshot.forEach((doc) => {
    prayerGroups.push({ id: doc.id, ...doc.data() } as PrayerGroup);
  });
  return prayerGroups;
}

export async function getPrayerGroup(id: string): Promise<PrayerGroup | null> {
    const docRef = doc(db, "prayer-groups", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as PrayerGroup;
    } else {
        return null;
    }
}

export async function addPrayerGroup(prayerGroup: Omit<PrayerGroup, 'id'>): Promise<void> {
    await addDoc(collection(db, "prayer-groups"), prayerGroup);
}

export async function updatePrayerGroup(id: string, prayerGroup: Partial<Omit<PrayerGroup, 'id'>>): Promise<void> {
    const docRef = doc(db, "prayer-groups", id);
    await updateDoc(docRef, prayerGroup);
}


export async function deletePrayerGroup(id: string): Promise<void> {
    await deleteDoc(doc(db, "prayer-groups", id));
}
