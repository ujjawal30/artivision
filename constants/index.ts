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
