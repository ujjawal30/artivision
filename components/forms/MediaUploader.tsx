"use client";

import React, { Dispatch, SetStateAction } from "react";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { ImagePlusIcon } from "lucide-react";

import { dataUrl, getImageSize } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface MediaUploaderProps {
  onValueChange: (value: string) => void;
  setImage: Dispatch<SetStateAction<IImage | null>>;
  publicId: string;
  image: IImage | null;
  type: string;
}

const MediaUploader = ({
  onValueChange,
  setImage,
  image,
  publicId,
  type,
}: MediaUploaderProps) => {
  const { toast } = useToast();

  const onUploadSuccessHandler = (result: any) => {
    setImage((prev: any) => ({
      ...prev,
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureURL: result?.info?.secure_url,
    }));

    onValueChange(result?.info?.public_id);

    toast({
      title: "Image uploaded successfully.",
      description: "1 credit has been deducted from your account.",
      duration: 5000,
      className: "bg-green-100 text-green-900",
    });
  };

  const onUploadErrorHandler = () => {
    toast({
      title: "Something went wrong while uploading.",
      description: "Please try again after sometimes.",
      duration: 5000,
      className: "bg-red-100 text-red-900",
    });
  };

  return (
    <div>
      <CldUploadWidget
        uploadPreset="artivision"
        options={{ multiple: false, resourceType: "image" }}
        onSuccess={onUploadSuccessHandler}
        onError={onUploadErrorHandler}
      >
        {({ open }) => (
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-3xl text-gray-600">Original</h3>

            {publicId ? (
              <div className="cursor-pointer overflow-hidden rounded-xl">
                <CldImage
                  width={getImageSize(type, image, "width")}
                  height={getImageSize(type, image, "height")}
                  src={publicId}
                  alt="image"
                  sizes="(max-width: 767px) 100vw, 50vw"
                  placeholder={dataUrl as PlaceholderValue}
                  className="h-fit min-h-72 w-full rounded-xl border border-dashed bg-claret-100/20 object-cover p-2"
                />
              </div>
            ) : (
              <div
                className="flex justify-center items-center h-72 cursor-pointer flex-col gap-5 rounded-2xl border border-dashed bg-claret-100/20 shadow-inner"
                onClick={() => open()}
              >
                <div className="rounded-2xl bg-white p-5 shadow-sm shadow-claret-200/50">
                  <ImagePlusIcon size={24} className="text-gray-600" />
                </div>
                <p className="text-center font-medium text-sm text-gray-600">
                  Click here to upload your original image
                </p>
              </div>
            )}
          </div>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default MediaUploader;
