import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Users, Star } from 'lucide-react';
import { AppSidebar } from '@/components/AppSidebar';

const facilities = [
  {
    id: 1,
    name: 'Basketball Court A',
    type: 'Basketball',
    capacity: 10,
    hourlyRate: 25,
    rating: 4.8,
    availability: 'Available',
    image: '/placeholder.svg?height=200&width=300',
    amenities: ['Air Conditioning', 'Sound System', 'Scoreboard'],
  },
  {
    id: 2,
    name: 'Tennis Court 1',
    type: 'Tennis',
    capacity: 4,
    hourlyRate: 20,
    rating: 4.6,
    availability: 'Busy',
    image: '/placeholder.svg?height=200&width=300',
    amenities: ['Professional Net', 'Lighting', 'Seating Area'],
  },
  {
    id: 3,
    name: 'Badminton Court 2',
    type: 'Badminton',
    capacity: 4,
    hourlyRate: 15,
    rating: 4.7,
    availability: 'Available',
    image: '/placeholder.svg?height=200&width=300',
    amenities: ['Professional Court', 'Equipment Rental', 'Changing Room'],
  },
  {
    id: 4,
    name: 'Volleyball Court',
    type: 'Volleyball',
    capacity: 12,
    hourlyRate: 30,
    rating: 4.9,
    availability: 'Available',
    image: '/placeholder.svg?height=200&width=300',
    amenities: ['Professional Net', 'Sand Court', 'Shower Facilities'],
  },
  {
    id: 5,
    name: 'Squash Court 1',
    type: 'Squash',
    capacity: 2,
    hourlyRate: 18,
    rating: 4.5,
    availability: 'Maintenance',
    image: '/placeholder.svg?height=200&width=300',
    amenities: ['Glass Back Wall', 'Air Conditioning', 'Equipment Storage'],
  },
  {
    id: 6,
    name: 'Table Tennis Room',
    type: 'Table Tennis',
    capacity: 4,
    hourlyRate: 12,
    rating: 4.4,
    availability: 'Available',
    image: '/placeholder.svg?height=200&width=300',
    amenities: ['Multiple Tables', 'Equipment Included', 'Ventilation'],
  },
];

export default function FacilitiesPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Facilities</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Sports Facilities</h1>
              <p className="text-muted-foreground">
                Browse and book available sports facilities
              </p>
            </div>
            <Button>Book Now</Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility) => (
              <Card key={facility.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={facility.image || '/placeholder.svg'}
                    alt={facility.name}
                    className="object-cover w-full h-full"
                  />
                  <Badge
                    className="absolute top-2 right-2"
                    variant={
                      facility.availability === 'Available'
                        ? 'default'
                        : facility.availability === 'Busy'
                        ? 'secondary'
                        : 'destructive'
                    }
                  >
                    {facility.availability}
                  </Badge>
                </div>

                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{facility.name}</CardTitle>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {facility.rating}
                      </span>
                    </div>
                  </div>
                  <CardDescription>{facility.type}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>Up to {facility.capacity} people</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>${facility.hourlyRate}/hour</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Amenities:</p>
                    <div className="flex flex-wrap gap-1">
                      {facility.amenities.map((amenity, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      className="flex-1"
                      disabled={facility.availability !== 'Available'}
                    >
                      Book Now
                    </Button>
                    <Button variant="outline" size="icon">
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
