import {
  BadgeIndianRupeeIcon,
  CameraIcon,
  HomeIcon,
  ImageIcon,
  ScanLine,
  Settings2Icon,
  StarsIcon,
  UserIcon,
} from "lucide-react";

export const navLinks: NavLink[] = [
  {
    label: "Home",
    route: "/",
    icon: HomeIcon,
  },
  {
    label: "Image Restore",
    route: "/transformations/add/restore",
    icon: ImageIcon,
  },
  {
    label: "Generative Fill",
    route: "/transformations/add/fill",
    icon: StarsIcon,
  },
  {
    label: "Object Remove",
    route: "/transformations/add/remove",
    icon: ScanLine,
  },
  {
    label: "Object Recolor",
    route: "/transformations/add/recolor",
    icon: Settings2Icon,
  },
  {
    label: "Background Remove",
    route: "/transformations/add/remove-bg",
    icon: CameraIcon,
  },
];

export const userNavLinks: NavLink[] = [
  {
    label: "Profile",
    route: "/profile",
    icon: UserIcon,
  },
  {
    label: "Buy Credits",
    route: "/credits",
    icon: BadgeIndianRupeeIcon,
  },
];

export const transformationTypes = {
  restore: {
    type: "restore",
    title: "Restore Image",
    subtitle: "Refine images by removing noise and imperfections",
    config: { restore: true },
    icon: ImageIcon,
  },
  fill: {
    type: "fill",
    title: "Generative Fill",
    subtitle: "Enhance an image's dimensions using AI outpainting",
    config: { fillBackground: true },
    icon: StarsIcon,
  },
  remove: {
    type: "remove",
    title: "Object Remove",
    subtitle: "Identify and eliminate objects from images",
    config: {
      remove: { prompt: "", removeShadow: true, multiple: true },
    },
    icon: ScanLine,
  },
  recolor: {
    type: "recolor",
    title: "Object Recolor",
    subtitle: "Identify and recolor objects from the image",
    config: {
      recolor: { prompt: "", to: "", multiple: true },
    },
    icon: Settings2Icon,
  },
  "remove-bg": {
    type: "remove-bg",
    title: "Background Remove",
    subtitle: "Removes the background of the image using AI",
    config: { "remove-bg": true },
    icon: CameraIcon,
  },
};

export const aspectRatioOptions = {
  "1:1": {
    aspectRatio: "1:1",
    label: "Square (1:1)",
    width: 1000,
    height: 1000,
  },
  "3:4": {
    aspectRatio: "3:4",
    label: "Standard Portrait (3:4)",
    width: 1000,
    height: 1334,
  },
  "9:16": {
    aspectRatio: "9:16",
    label: "Phone Portrait (9:16)",
    width: 1000,
    height: 1778,
  },
};

export const defaultValues = {
  title: "",
  aspectRatio: "",
  color: "",
  prompt: "",
  publicId: "",
};

export type aspectRatioKey = keyof typeof aspectRatioOptions;
