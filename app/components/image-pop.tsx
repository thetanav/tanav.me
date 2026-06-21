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
        <button
          type="button"
          aria-label="Open profile photo"
          className="ring-4 overflow-hidden ring-(--text-muted)/30 rounded-xl relative cursor-pointer select-none active:translate-y-0.5 w-24"
        >
          <Image
            width={1}
            height={1}
            alt=""
            loading="eager"
            className="w-full h-full object-contain blur-sm scale-105"
            src="/pfp.png"
            draggable={false}
          />
          <Image
            width={50}
            height={50}
            alt="Tanav Poswal profile photo thumbnail"
            loading="lazy"
            className="absolute top-0 bottom-0 z-10 h-full w-full"
            src="/pfp.png"
            draggable={false}
          />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogTitle className="sr-only">Profile photo</DialogTitle>
        <Image
          width={400}
          height={400}
          alt="Tanav Poswal profile photo"
          className="rounded-md select-none w-full"
          src="/pfp.png"
          draggable={false}
        />
      </DialogContent>
    </Dialog>
  );
}
