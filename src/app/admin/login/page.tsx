import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Church } from 'lucide-react';

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center items-center mb-4">
               <Church className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="font-headline text-3xl">Admin Login</CardTitle>
            <CardDescription>Access the Fatima Connect Dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="admin@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
               <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <Link href="/admin/dashboard">Login</Link>
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              <Link href="/" className="underline text-muted-foreground hover:text-primary">
                Back to website
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
