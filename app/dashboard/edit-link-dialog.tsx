"use client";

import { useState, useTransition, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateLinkAction } from "@/app/dashboard/actions";

type EditLinkDialogProps = {
  link: {
    id: number;
    destinationUrl: string;
    shortCode: string;
  };
};

export function EditLinkDialog({ link }: EditLinkDialogProps) {
  const [open, setOpen] = useState(false);
  const [destinationUrl, setDestinationUrl] = useState(link.destinationUrl);
  const [shortCode, setShortCode] = useState(link.shortCode);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleOpenChange(next: boolean) {
    setOpen(next);
    setError(null);
    if (next) {
      setDestinationUrl(link.destinationUrl);
      setShortCode(link.shortCode);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await updateLinkAction({
        id: link.id,
        destinationUrl,
        shortCode,
      });
      if ("error" in result) {
        setError(result.error);
        return;
      }
      handleOpenChange(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Edit link</DialogTitle>
            <DialogDescription>
              Update the destination URL or short code for this link.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Label htmlFor={`destinationUrl-${link.id}`}>
              Destination URL
            </Label>
            <Input
              id={`destinationUrl-${link.id}`}
              type="url"
              placeholder="https://example.com/some/long/url"
              value={destinationUrl}
              onChange={(e) => setDestinationUrl(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor={`shortCode-${link.id}`}>Short code</Label>
            <Input
              id={`shortCode-${link.id}`}
              placeholder="my-link"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              maxLength={20}
              required
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}

          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
