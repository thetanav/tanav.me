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
        <div className="ring-4 overflow-hidden ring-(--text-muted)/20 rounded-xl relative cursor-pointer select-none active:translate-y-0.5 w-24">
          <Image
            width={1}
            height={1}
            alt="my pfp"
            loading="eager"
            className="w-full h-full object-contain blur-sm scale-105"
            src="/pfp.png"
            draggable={false}
          />
          <Image
            width={50}
            height={50}
            alt="my pfp"
            loading="lazy"
            className="absolute top-0 bottom-0 z-10 h-full w-full"
            src="/pfp.png"
            draggable={false}
          />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogTitle className="hidden">hidden</DialogTitle>
        <Image
          width={400}
          height={400}
          alt="my pfp"
          className="rounded-md select-none w-full"
          src="/pfp.png"
          draggable={false}
        />
      </DialogContent>
    </Dialog>
  );
}
