// app/types/artwork.ts
export type Artwork = {
    id: string;
    title: string;
    artist: string;
    imageUrl: string;
    style: string;
  };
  
  export type QuizAnswer = {
    artworkId: string;
    rating: -1 | 0 | 1; // dislike / neutral / like
  };
  