export interface PhotoItem {
  id: number;
  url: string;
  caption: string;
  subCaption: string;
  rotation: number;
  tapeColor: string;
}

export interface MediaSettings {
  photos: PhotoItem[];
  audioUrl: string;
  audioTitle: string;
}

export interface FloatingStickerItem {
  id: string;
  emoji: string;
  label: string;
  x: number;
  y: number;
  rotate: number;
  scale: number;
}
