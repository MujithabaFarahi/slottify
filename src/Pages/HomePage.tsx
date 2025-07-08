import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="m-10">
      <div className="flex flex-col items-center justify-center gap-y-4">
        <Button disabled variant={'default'}>
          Click me
        </Button>
        <Button variant={'ghost'}>Click me</Button>
        <Button variant={'link'}>Click me</Button>
        <Button variant={'outline'}>Click me</Button>
        <Button variant={'destructive'}>Click me</Button>
        <Button variant={'secondary'}>Click me</Button>
      </div>
    </div>
  );
}
