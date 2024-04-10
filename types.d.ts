type LucideIcon = import("lucide-react").LucideIcon;

declare type NavLink = {
  label: string;
  route: string;
  icon: LucideIcon;
};

declare type CreateUserParams = {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  photo: string;
};

declare type UpdateUserParams = {
  firstName: string;
  lastName: string;
  photo: string;
};
