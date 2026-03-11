import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

export default function ImagePop() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          alt="my pfp"
          className="ring-4 ring-(--text-muted)/20 rounded-xl cursor-pointer select-none active:translate-y-0.5"
          width={90}
          height={90}
          src="/pfp.png"
          draggable={false}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>My face</DialogTitle>
        </DialogHeader>
        <Image
          alt="my pfp"
          className="rounded-xl select-none"
          width={500}
          height={500}
          src="/pfp.png"
          quality={100}
          draggable={false}
        />
      </DialogContent>
    </Dialog>
  );
}
