import type { DefineComponent } from 'vue';

export interface VdMusicPlayerTrack {
  name: string;
  url: string;
}

export interface VdMusicPlayerOptions {
  volume?: number;
  shuffle?: boolean;
  repeat?: 'off' | 'one' | 'all';
  showProgress?: boolean;
  showPlaylist?: boolean;
  autoAdvance?: boolean;
  glass?: boolean;
  detachable?: boolean;
  floatingPosition?: string | null;
  draggable?: boolean;
  minimizable?: boolean;
  startMinimized?: boolean;
  persistPosition?: boolean;
  persistKey?: string;
}

export interface VdMusicPlayerProps {
  /** Playlist ([{ name, url }]). */
  tracks?: VdMusicPlayerTrack[];
  /** Player options. */
  options?: VdMusicPlayerOptions;
}

export declare const VdMusicPlayer: DefineComponent<VdMusicPlayerProps>;
export default VdMusicPlayer;
