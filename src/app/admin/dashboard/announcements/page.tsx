import AnnouncementForm from './announcement-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AnnouncementsPage() {
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">AI Announcement Assistant</CardTitle>
          <CardDescription>
            Provide a simple prompt, and the AI will generate a draft for a church announcement.
            For example: "Draft an announcement for the annual charity drive happening on October 28th, asking for donations of clothes and food."
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AnnouncementForm />
        </CardContent>
      </Card>
    </div>
  );
}
