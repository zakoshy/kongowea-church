import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu';
  

export default function ManageEventsPage() {
    const events = [
        { title: "Sunday Mass", date: "2024-11-03", status: "Recurring" },
        { title: "Youth Fellowship", date: "2024-11-01", status: "Published" },
        { title: "Annual Charity Drive", date: "2024-10-28", status: "Archived" },
        { title: "Choir Practice", date: "2024-10-31", status: "Recurring" },
      ];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                <CardTitle className="font-headline text-3xl">Manage Events</CardTitle>
                <CardDescription>
                    Update, add, or remove church events.
                </CardDescription>
            </div>
            <Button asChild>
                <Link href="#">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Event
                </Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{event.title}</TableCell>
              <TableCell>
                <Badge variant={event.status === "Published" ? "default" : "outline"}>{event.status}</Badge>
              </TableCell>
              <TableCell>{event.date}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
