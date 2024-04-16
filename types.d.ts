// type LucideIcon = import("lucide-react").LucideIcon;
type IImage = import("@/lib/models/image.model").IImage;

declare type NavLink = {
  label: string;
  route: string;
  icon: string;
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

declare type AllImagesParams = {
  limit?: number;
  page: number;
  searchQuery?: string;
};

declare type AllImagesData = {
  data: IImage[];
  totalPages: number;
  savedImages: number;
};

declare type UserImagesParams = {
  limit?: number;
  page: number;
  userId: string;
};

declare type UserImagesData = {
  data: IImage[];
  totalPages: number;
};

declare type CheckoutTransactionParams = {
  plan: string;
  credits: number;
  amount: number;
  userId: string;
};

declare type CreateTransactionParams = {
  stripeId: string;
  amount: number;
  credits: number;
  plan: string;
  user: string;
  createdAt: Date;
};

declare type TransformedImageData = {
  title: string;
  publicId: string;
  transformationType: string;
  width: number;
  height: number;
  config: any;
  secureURL: string;
  transformationURL: string;
  aspectRatio: string | undefined;
  prompt: string | undefined;
  color: string | undefined;
};

declare type Transformations = {
  restore?: boolean;
  fillBackground?: boolean;
  remove?: {
    prompt: string;
    removeShadow?: boolean;
    multiple?: boolean;
  };
  recolor?: {
    prompt?: string;
    to: string;
    multiple?: boolean;
  };
  removeBackground?: boolean;
};

declare type TransformationTypeKey =
  | "restore"
  | "fill"
  | "remove"
  | "recolor"
  | "remove-bg";

declare type SearchParamProps = {
  params: { id: string; type: TransformationTypeKey };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type TransformationFormProps = {
  action: "Add" | "Update";
  userId: string;
  type: TransformationTypeKey;
  creditBalance: number;
  data?: IImage | null;
  config?: Transformations | null;
};

declare type TransformedImageProps = {
  image: IImage | null;
  type: TransformationTypeKey;
  title: string;
  transformationConfig: Transformations | null;
  isTransforming: boolean;
  hasDownload?: boolean;
  setIsTransforming?: React.Dispatch<React.SetStateAction<boolean>>;
};
