"use client";

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

const icons = {
  HomeIcon,
  ImageIcon,
  StarsIcon,
  ScanLine,
  Settings2Icon,
  CameraIcon,
  UserIcon,
  BadgeIndianRupeeIcon,
};

export const fetchIcon = (icon: string) => {
  return icons[icon as keyof typeof icons];
};
