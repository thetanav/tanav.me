type SpotifyTrack = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
};

const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

function getSpotifyCredentials() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  return {
    refreshToken,
    basic: Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
  };
}

async function getAccessToken() {
  const credentials = getSpotifyCredentials();
  if (!credentials) {
    return null;
  }

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials.basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: credentials.refreshToken,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as { access_token?: string };
  return data.access_token ?? null;
}

export async function getNowPlaying(): Promise<SpotifyTrack> {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      return { isPlaying: false };
    }

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (response.status === 204 || response.status > 400) {
      return { isPlaying: false };
    }

    const song = (await response.json()) as {
      is_playing?: boolean;
      item?: {
        name?: string;
        artists?: Array<{ name: string }>;
        album?: {
          name?: string;
          images?: Array<{ url: string }>;
        };
        external_urls?: {
          spotify?: string;
        };
      };
    };

    if (!song.item) {
      return { isPlaying: false };
    }

    return {
      isPlaying: Boolean(song.is_playing),
      title: song.item.name,
      artist: song.item.artists?.map((entry) => entry.name).join(", "),
      album: song.item.album?.name,
      albumImageUrl: song.item.album?.images?.[0]?.url,
      songUrl: song.item.external_urls?.spotify,
    };
  } catch {
    return { isPlaying: false };
  }
}

export type { SpotifyTrack };
