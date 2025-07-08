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
import { Calendar, Clock, MapPin, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AppSidebar } from '@/components/AppSidebar';

const reservations = [
  {
    id: 1,
    facility: 'Basketball Court A',
    date: 'Today',
    time: '3:00 PM - 4:00 PM',
    status: 'Confirmed',
    price: '$25',
    participants: 8,
  },
  {
    id: 2,
    facility: 'Tennis Court 2',
    date: 'Tomorrow',
    time: '10:00 AM - 11:30 AM',
    status: 'Confirmed',
    price: '$30',
    participants: 4,
  },
  {
    id: 3,
    facility: 'Badminton Court 1',
    date: 'Dec 22, 2024',
    time: '7:00 PM - 8:30 PM',
    status: 'Pending',
    price: '$22.50',
    participants: 4,
  },
  {
    id: 4,
    facility: 'Volleyball Court',
    date: 'Dec 25, 2024',
    time: '2:00 PM - 4:00 PM',
    status: 'Confirmed',
    price: '$60',
    participants: 12,
  },
  {
    id: 5,
    facility: 'Squash Court 1',
    date: 'Dec 28, 2024',
    time: '6:00 PM - 7:00 PM',
    status: 'Cancelled',
    price: '$18',
    participants: 2,
  },
];

export default function ReservationsPage() {
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
                <BreadcrumbPage>My Reservations</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">My Reservations</h1>
              <p className="text-muted-foreground">
                Manage your upcoming and past bookings
              </p>
            </div>
            <Button>New Reservation</Button>
          </div>

          <div className="grid gap-4">
            {reservations.map((reservation) => (
              <Card key={reservation.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                        <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {reservation.facility}
                        </CardTitle>
                        <CardDescription>
                          {reservation.participants} participants •{' '}
                          {reservation.price}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          reservation.status === 'Confirmed'
                            ? 'default'
                            : reservation.status === 'Pending'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {reservation.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Modify Booking</DropdownMenuItem>
                          <DropdownMenuItem>Invite Friends</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Cancel Booking
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{reservation.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{reservation.time}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {reservation.status === 'Confirmed' && (
                        <>
                          <Button variant="outline" size="sm">
                            Check In
                          </Button>
                          <Button variant="outline" size="sm">
                            Modify
                          </Button>
                        </>
                      )}
                      {reservation.status === 'Pending' && (
                        <Button variant="outline" size="sm">
                          Pay Now
                        </Button>
                      )}
                      {reservation.status === 'Cancelled' && (
                        <Button variant="outline" size="sm">
                          Rebook
                        </Button>
                      )}
                    </div>
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
