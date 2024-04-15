"use client";

import React, { MouseEvent } from "react";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import { DownloadIcon, LoaderIcon } from "lucide-react";
import { CldImage, getCldImageUrl } from "next-cloudinary";

import { dataUrl, debounce, download, getImageSize } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const TransformedImage = ({
  image,
  type,
  title,
  transformationConfig,
  isTransforming,
  setIsTransforming,
  hasDownload = true,
}: TransformedImageProps) => {
  console.log("image :>> ", image);
  console.log("title :>> ", title);
  console.log("transformationConfig :>> ", transformationConfig);

  const downloadHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const fileURL = getCldImageUrl({
      width: image?.width,
      height: image?.height,
      src: image?.publicId || "",
      ...transformationConfig,
    });

    download(fileURL, title);
  };

  const onTransformLoadHandler = () => {
    setIsTransforming && setIsTransforming(false);
  };

  const onTransformErrorHandler = () => {
    debounce(() => {
      setIsTransforming && setIsTransforming(false);
    }, 8000);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-3xl text-dark-600">Transformed</h3>
        {hasDownload && (
          <Button
            variant="ghost"
            size="icon"
            className="flex items-center gap-2 px-2"
            onClick={downloadHandler}
          >
            <DownloadIcon size={24} />
          </Button>
        )}
      </div>

      {image?.publicId && transformationConfig ? (
        <div className="relative">
          <CldImage
            width={getImageSize(type, image, "width")}
            height={getImageSize(type, image, "height")}
            src={image.publicId}
            alt={title}
            sizes="(max-width: 767px) 100vw, 50vw"
            placeholder={dataUrl as PlaceholderValue}
            className="h-fit min-h-72 w-full rounded-xl border border-dashed bg-claret-100/20 object-cover p-2"
            onLoad={onTransformLoadHandler}
            onError={onTransformErrorHandler}
            {...transformationConfig}
          />

          {isTransforming && (
            <div className="flex justify-center items-center absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-xl border bg-dark-700/90">
              <LoaderIcon size={48} className="text-white animate-spin" />
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center font-medium text-sm text-dark-600 h-full min-h-72 flex-col gap-5 rounded-2xl border border-dashed bg-claret-100/20 shadow-inner">
          Transformed Image
        </div>
      )}
    </div>
  );
};

export default TransformedImage;
