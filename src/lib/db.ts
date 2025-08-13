/**
 * @file This file is a temporary mock database for storing community data.
 * In a real application, this would be replaced with a proper database like Firebase Firestore.
 */
import { promises as fs } from 'fs';
import path from 'path';
import type { Community } from './definitions';

const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'data', 'communities.json');

async function readData(): Promise<Community[]> {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
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

async function writeData(data: Community[]): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function getCommunities(): Promise<Community[]> {
  return await readData();
}

export async function addCommunity(community: Community): Promise<void> {
  const communities = await readData();
  communities.push(community);
  await writeData(communities);
}
