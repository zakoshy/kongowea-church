import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartHandshake, Landmark, Smartphone } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="bg-card">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <HeartHandshake className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Support Our Mission</h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Your generous contributions empower our ministry, support our community outreach, and help maintain our beautiful church.
            Every gift, no matter the size, makes a significant impact.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center gap-4">
              <Landmark className="w-8 h-8 text-primary" />
              <CardTitle className="font-headline text-2xl">Bank Transfer</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>You can make a direct deposit or transfer to our parish bank account.</CardDescription>
              <div className="mt-4 space-y-2 text-sm">
                <p><span className="font-semibold">Account Name:</span> Our Lady of Fatima Kongowea</p>
                <p><span className="font-semibold">Account Number:</span> 1234567890</p>
                <p><span className="font-semibold">Bank:</span> Catholic Faith Bank</p>
                <p><span className="font-semibold">Branch:</span> Mombasa</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center gap-4">
              <Smartphone className="w-8 h-8 text-primary" />
              <CardTitle className="font-headline text-2xl">Mobile Giving</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>For your convenience, you can give through mobile money.</CardDescription>
               <div className="mt-4 space-y-2 text-sm">
                <p><span className="font-semibold">Paybill Number:</span> 555222</p>
                <p><span className="font-semibold">Account Number:</span> Tithe or specify purpose</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Donate Securely Online
          </Button>
           <p className="text-muted-foreground text-sm mt-4">For any assistance, please visit the parish office.</p>
        </div>
      </div>
    </div>
  );
}
