import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const churchLocation = "Our Lady of Fatima Catholic Church, Kongowea, Mombasa";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(churchLocation)}`;
  const embedMapsUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=Our+Lady+of+Fatima+Parish+Kongowea,Mombasa`;

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
            <div className="rounded-lg overflow-hidden shadow-lg h-[400px] flex flex-col">
              <iframe
                  className="w-full h-full"
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.80588694857!2d39.67756831476016!3d-4.058319997042579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1840130541780459%3A0x2889e4722513a07!2sOur%20Lady%20of%20Fatima%20Catholic%20Church%20Kongowea!5e0!3m2!1sen!2ske!4v1628588825686!5m2!1sen!2ske`}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
               <Button asChild className="mt-4 w-full">
                  <Link href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(churchLocation)}`} target="_blank" rel="noopener noreferrer">
                    Get Directions
                  </Link>
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
