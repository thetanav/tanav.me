"use client";

import { Music2, Radio, Loader2 } from "lucide-react";
import { SiSpotify } from "react-icons/si";
import { useEffect, useState } from "react";

type SpotifyTrack = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
};

export default function SpotifyNowPlaying() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    const fetchNowPlaying = async () => {
      try {
        const response = await fetch("/api/spotify", { cache: "no-store" });
        const data = (await response.json()) as SpotifyTrack;
        setTrack(data);
      } catch {
        setTrack({ isPlaying: false });
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();
    intervalId = setInterval(fetchNowPlaying, 30_000);

    return () => clearInterval(intervalId);
  }, []);

  const isPlaying = track?.isPlaying;

  return (
    <div className="rounded-xl border border-border bg-linear-to-b from-(--bg) to-(--accent-soft)/50 p-3">
      <div className="flex items-start gap-2">
        <div className="p-0">
          <SiSpotify className="h-5 w-5 fill-green-400" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-xs text-(--text-muted)">
            <span>Spotify</span>
            <span>•</span>
            {loading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : isPlaying ? (
              <span className="inline-flex items-center gap-1">
                <Radio className="h-3.5 w-3.5" />
                Now Playing
              </span>
            ) : (
              <span className="inline-flex items-center gap-1">
                <Music2 className="h-3.5 w-3.5" />
                Not Playing
              </span>
            )}
          </div>

          {isPlaying && track?.songUrl ? (
            <a
              href={track.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block">
              <p className="truncate font-medium text-(--text) hover:underline">
                {track.title}
              </p>
              <p className="truncate text-sm text-(--text-muted)">
                {track.artist}
              </p>
            </a>
          ) : (
            <div className="mt-1">
              <p className="font-medium text-(--text)">
                Nothing on loop right now
              </p>
            </div>
          )}
        </div>

        {isPlaying && track?.albumImageUrl ? (
          <img
            src={track.albumImageUrl}
            alt={track.album ?? "Album cover"}
            className="h-12 w-12 shrink-0 rounded-md border border-border object-cover"
          />
        ) : null}
      </div>
    </div>
  );
}
