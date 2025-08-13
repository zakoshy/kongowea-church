import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Get In Touch</h1>
          <p className="text-muted-foreground mt-2 text-lg">We'd love to hear from you. Reach out with any questions or prayer requests.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea id="message" placeholder="Type your message here..." rows={6} />
                  </div>
                  <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Submit Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-lg">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 mr-4 mt-1 text-primary" />
                  <span>123 Faith Street, Kongowea, Mombasa, Kenya</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 mr-4 text-primary" />
                  <span>+254 700 123 456</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 mr-4 text-primary" />
                  <span>contact@fatimakongowea.org</span>
                </div>
              </CardContent>
            </Card>
            <div className="rounded-lg overflow-hidden shadow-lg">
               <Image src="https://placehold.co/600x400.png" width={600} height={400} alt="Map to church" className="w-full" data-ai-hint="city map" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
