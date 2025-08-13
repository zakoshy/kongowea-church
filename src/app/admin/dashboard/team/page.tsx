
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
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getTeamMembers } from '@/lib/db';
import { deleteTeamMemberAction } from '@/lib/actions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default async function ManageTeamPage() {
    const team = await getTeamMembers();

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                <CardTitle className="font-headline text-3xl">Manage Team</CardTitle>
                <CardDescription>
                    Update information for parish leadership and staff.
                </CardDescription>
            </div>
            <Button asChild>
                <Link href="/admin/dashboard/team/new">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Member
                </Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {team.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src={member.Image} alt={member.Name} data-ai-hint="person photo" />
                    <AvatarFallback>{member.Name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  {member.Name}
                </div>
              </TableCell>
              <TableCell>
                {member.Description}
              </TableCell>
              <TableCell>
                <AlertDialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </AlertDialogTrigger>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the team member
                        and remove their data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <form action={deleteTeamMemberAction.bind(null, member.id)}>
                        <AlertDialogAction type="submit">Delete</AlertDialogAction>
                      </form>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
