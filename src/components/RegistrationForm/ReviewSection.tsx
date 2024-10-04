import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ReviewSection({
  title,
  content,
  openDialog,
  setOpenDialog,
}) {
  return (
    <div className="bg-input p-4 rounded-lg">
      <Dialog
        open={openDialog === title}
        onOpenChange={() => setOpenDialog(openDialog === title ? null : title)}
      >
        <DialogTrigger asChild>
          <Button variant="ghost" className="w-full justify-between">
            <h3 className="text-lg font-semibold">{title}</h3>
            <span>View Details</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="mt-4 max-h-[60vh]">
            <div className="space-y-4">
              {content.map((item, index) => (
                <div key={index} className="space-y-1">
                  <p className="font-medium">{item.label}:</p>
                  <p className="text-sm text-muted-foreground whitespace-normal break-all overflow-wrap-anywhere">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
