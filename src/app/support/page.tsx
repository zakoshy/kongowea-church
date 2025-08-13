
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartHandshake, Landmark, Smartphone, CreditCard, BotMessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";

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
           <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Donate Securely Online
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="font-headline text-2xl">Make a Donation</DialogTitle>
                  <DialogDescription>
                    Choose your preferred payment method. Thank you for your generosity.
                  </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="card" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="card"><CreditCard className="w-4 h-4 mr-2" />Card</TabsTrigger>
                    <TabsTrigger value="mpesa">M-Pesa</TabsTrigger>
                    <TabsTrigger value="paypal">PayPal</TabsTrigger>
                  </TabsList>
                  <TabsContent value="card">
                     <Card className="border-none shadow-none">
                        <CardHeader>
                           <CardTitle>Credit/Debit Card</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="space-y-2">
                             <Label htmlFor="amount-card">Amount (KES)</Label>
                             <Input id="amount-card" placeholder="Enter amount" type="number" />
                           </div>
                           <div className="space-y-2">
                             <Label htmlFor="card-number">Card Number</Label>
                             <Input id="card-number" placeholder="MM/YY CVC" />
                           </div>
                           <Button type="submit" className="w-full">Pay Now</Button>
                        </CardContent>
                     </Card>
                  </TabsContent>
                  <TabsContent value="mpesa">
                     <Card className="border-none shadow-none">
                        <CardHeader>
                           <CardTitle>M-Pesa</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="space-y-2">
                             <Label htmlFor="amount-mpesa">Amount (KES)</Label>
                             <Input id="amount-mpesa" placeholder="Enter amount" type="number" />
                           </div>
                           <div className="space-y-2">
                             <Label htmlFor="phone-mpesa">Phone Number</Label>
                             <Input id="phone-mpesa" placeholder="0712 345 678" type="tel" />
                           </div>
                           <Button type="submit" className="w-full">Send STK Push</Button>
                        </CardContent>
                     </Card>
                  </TabsContent>
                  <TabsContent value="paypal">
                     <Card className="border-none shadow-none">
                       <CardHeader>
                           <CardTitle>PayPal</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="space-y-2">
                             <Label htmlFor="amount-paypal">Amount (USD)</Label>
                             <Input id="amount-paypal" placeholder="Enter amount" type="number" />
                           </div>
                           <Button type="submit" className="w-full" asChild>
                              <Link href="https://paypal.com" target="_blank">Proceed to PayPal</Link>
                           </Button>
                        </CardContent>
                     </Card>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
           <p className="text-muted-foreground text-sm mt-4">For any assistance, please visit the parish office.</p>
        </div>
      </div>
    </div>
  );
}
