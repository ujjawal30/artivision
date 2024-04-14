"use client";

import React from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";

import { transformationTypes } from "@/constants";

interface ImageCardProps {
  image: IImage;
}

const ImageCard = ({ image }: ImageCardProps) => {
  const Icon =
    transformationTypes[image.transformationType as TransformationTypeKey].icon;

  return (
    <div>
      <Link
        href={`/transformations/${image._id}`}
        className="flex flex-1 cursor-pointer flex-col gap-5 rounded-2xl border-2 border-claret-200/15 bg-white p-4 shadow-xl shadow-claret-200/10 transition-all hover:shadow-claret-200/20"
      >
        <CldImage
          src={image.publicId}
          alt={image.title}
          width={image.width}
          height={image.height}
          {...image.config}
          loading="lazy"
          className="h-52 w-full rounded-lg object-cover"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
        />
        <div className="flex-between">
          <p className="p-20-semibold mr-3 line-clamp-1 text-dark-600">
            {image.title}
          </p>
          <Icon size={24} />
        </div>
      </Link>
    </div>
  );
};

export default ImageCard;
