import { create } from 'zustand';

type ImageStore = {
  clearImages(): unknown;
  images: string[];
  addImage: (imageUrl: string) => void;
  setImage: (image: string[]) => void;
};

export const useImageStore = create<ImageStore>((set) => ({
  images: [],
  addImage: (imageUrl) =>
    set((state) => ({
      images: [...state.images, imageUrl],
    })),
  setImage: (image: string[]) => set({ images: image }),
  clearImages: () => set({ images: [] }),
}));
