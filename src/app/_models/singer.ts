import { Song } from './song';
export class Singer {
    id: number;
    url: string;
    name: string;
    nameRus: string;
    preview: string;
    header: string;
    headerMobile: string;
    genres: number[];
    tracklist: Song[];
  }