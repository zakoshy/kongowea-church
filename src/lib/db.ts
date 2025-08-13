/**
 * @file This file is a temporary mock database for storing community data.
 * In a real application, this would be replaced with a proper database like Firebase Firestore.
 */
import { promises as fs } from 'fs';
import path from 'path';
import type { Community, Event } from './definitions';

const communitiesDataPath = path.join(process.cwd(), 'src', 'lib', 'data', 'communities.json');
const eventsDataPath = path.join(process.cwd(), 'src', 'lib', 'data', 'events.json');

async function readData<T>(filePath: string): Promise<T[]> {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    // If the file doesn't exist, return an empty array
    if (isNodeError(error) && error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
    return error instanceof Error;
}

async function writeData<T>(filePath: string, data: T[]): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function getCommunities(): Promise<Community[]> {
  return await readData<Community>(communitiesDataPath);
}

export async function addCommunity(community: Community): Promise<void> {
  const communities = await getCommunities();
  communities.push(community);
  await writeData(communitiesDataPath, communities);
}


export async function getEvents(): Promise<Event[]> {
    return await readData<Event>(eventsDataPath);
}

export async function addEvent(event: Event): Promise<void> {
    const events = await getEvents();
    events.push(event);
    await writeData(eventsDataPath, events);
}
