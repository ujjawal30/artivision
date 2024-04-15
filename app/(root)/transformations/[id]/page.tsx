import React from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { getImageById } from "@/lib/actions/image.actions";
import { getImageSize } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import TransformedImage from "@/components/shared/TransformedImage";
import Header from "@/components/miscellaneous/Header";
import Info from "@/components/miscellaneous/Info";
import DeleteImage from "@/components/dialogs/DeleteImage";

const TransformationsPage = async ({ params: { id } }: SearchParamProps) => {
  const { userId } = auth();

  const image = await getImageById(id);
  if (!image) redirect("/");

  return (
    <div>
      <Header title={image.title} />

      <section className="mt-5 flex flex-wrap gap-4">
        <Info title="Transformation" text={image.transformationType} />

        {image.prompt && <Info title="Prompt" text={image.prompt} optional />}

        {image.color && <Info title="Color" text={image.color} optional />}

        {image.aspectRatio && (
          <Info title="Aspect Ratio" text={image.aspectRatio} optional />
        )}
      </section>

      <section className="mt-10 border-t border-dark-400/15">
        <div className="grid h-fit min-h-48 grid-cols-1 gap-5 py-8 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h3 className="text-3xl font-bold text-dark-600">Original</h3>

            <Image
              width={getImageSize(image.transformationType, image, "width")}
              height={getImageSize(image.transformationType, image, "height")}
              src={image.secureURL}
              alt="image"
              className="h-fit min-h-72 w-full rounded-lg border border-dashed bg-claret-100/20 object-cover p-2"
            />
          </div>

          <TransformedImage
            image={image}
            type={image.transformationType as TransformationTypeKey}
            title={image.title}
            isTransforming={false}
            transformationConfig={image.config || null}
            hasDownload={true}
          />
        </div>

        {userId === image.author?.clerkId && (
          <div className="mt-4 space-y-4">
            <Button
              asChild
              type="button"
              className="bg-gradient-to-r from-claret-500 to-flamingo-500 rounded-2xl py-4 px-6 font-semibold h-12 w-full md:h-14 capitalize"
            >
              <Link href={`/transformations/${image._id}/update`}>
                Update Image
              </Link>
            </Button>

            <DeleteImage imageId={image._id} />
          </div>
        )}
      </section>
    </div>
  );
};

export default TransformationsPage;
