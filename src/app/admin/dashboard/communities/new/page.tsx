
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function NewCommunityPage() {
  return (
    <div className="container mx-auto py-10">
      <form>
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                   <Button asChild variant="outline" size="icon">
                       <Link href="/admin/dashboard/communities">
                          <ArrowLeft className="h-4 w-4" />
                       </Link>
                  </Button>
                  <div>
                      <CardTitle className="font-headline text-3xl">Add New Community</CardTitle>
                      <CardDescription>
                          Fill in the details below to add a new community to the parish records.
                      </CardDescription>
                  </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="community-name">Community Name</Label>
              <Input id="community-name" placeholder="e.g., Catholic Men Association" required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="location">Location / Meeting Point</Label>
              <Input id="location" placeholder="e.g., St. Peter's Hall" required />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="total-members">Total Members</Label>
                  <Input id="total-members" type="number" placeholder="e.g., 50" required />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="community-head">Community Head</Label>
                    <Input id="community-head" placeholder="e.g., John Doe" required />
                 </div>
             </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="e.g., +254 700 123 456" required />
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
              <div className="flex justify-end w-full">
                <Button>
                    <Save className="mr-2 h-4 w-4" /> Save Community
                </Button>
              </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
