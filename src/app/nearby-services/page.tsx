import { Building, Map, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const services = [
  {
    name: 'City General Hospital',
    type: 'Hospital',
    address: '123 Health St, Metropolis',
    waitTime: '15 min',
    rating: 4.8,
  },
  {
    name: 'Wellness Clinic',
    type: 'Clinic',
    address: '456 Wellness Ave, Metropolis',
    waitTime: '5 min',
    rating: 4.9,
  },
  {
    name: 'Community Pharmacy',
    type: 'Pharmacy',
    address: '789 Cure Rd, Metropolis',
    waitTime: '2 min',
    rating: 4.7,
  },
  {
    name: 'Northside Medical Center',
    type: 'Hospital',
    address: '101 North Blvd, Metropolis',
    waitTime: '25 min',
    rating: 4.6,
  },
  {
    name: 'QuickCare Urgent Care',
    type: 'Clinic',
    address: '210 Speedy Way, Metropolis',
    waitTime: '10 min',
    rating: 4.8,
  },
];

export default function NearbyServicesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Nearby Healthcare
        </h1>
        <p className="mt-2 text-muted-foreground">
          Find hospitals, clinics, and pharmacies near you.
        </p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex h-[500px] flex-col gap-4 md:flex-row">
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button>Hospitals</Button>
                <Button variant="secondary">Clinics</Button>
                <Button variant="secondary">Pharmacies</Button>
              </div>
              <div className="h-full space-y-3 overflow-y-auto rounded-lg border bg-background p-2">
                {services.map((service) => (
                  <div
                    key={service.name}
                    className="cursor-pointer rounded-md border p-4 transition-all hover:bg-muted/50 hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold">{service.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {service.address}
                        </p>
                      </div>
                      <Badge
                        variant={
                          service.type === 'Hospital' ? 'destructive' : 'secondary'
                        }
                      >
                        {service.type}
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1.5">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{service.rating}</span>
                      </div>
                      <p>
                        Wait time:
                        <span className="font-semibold"> {service.waitTime}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 rounded-lg bg-muted flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                    <Map className="mx-auto h-16 w-16"/>
                    <p className="mt-2 font-medium">Map view would appear here</p>
                    <p className="text-sm">Integration with a map service is required.</p>
                </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
