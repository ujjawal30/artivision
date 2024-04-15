"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v2 as cloudinary } from "cloudinary";

import { connectToDatabase } from "@/lib/mongoose";
import Image, { IImage } from "@/lib/models/image.model";
import User from "@/lib/models/user.model";
import { handleError } from "@/lib/utils";

export const addImage = async (
  imageData: TransformedImageData,
  userId: string,
  path: string
): Promise<IImage | undefined> => {
  try {
    await connectToDatabase();

    const author = await User.findById(userId);

    if (!author) handleError("User not found");

    const newImage = await Image.create({
      ...imageData,
      author: author?._id,
    });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newImage));
  } catch (error) {
    handleError(error);
  }
};
export const getImageById = async (
  imageId: string
): Promise<IImage | undefined> => {
  try {
    await connectToDatabase();

    const image = await Image.findById(imageId).populate({
      path: "author",
      model: User,
      select: "_id firstName lastName",
    });

    if (!image) handleError("Image not found");

    return JSON.parse(JSON.stringify(image));
  } catch (error) {
    handleError(error);
  }
};
export const updateImage = async (
  imageId: string,
  imageData: TransformedImageData,
  userId: string,
  path: string
): Promise<IImage | undefined> => {
  try {
    await connectToDatabase();

    const imageToUpdate = await Image.findById(imageId);

    if (!imageToUpdate || imageToUpdate.author?._id !== userId)
      handleError("Unauthorized or image not found");

    const updatedImage = await Image.findByIdAndUpdate(imageId, imageData, {
      new: true,
    });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedImage));
  } catch (error) {
    handleError(error);
  }
};
export const deleteImage = async (imageId: string): Promise<void> => {
  try {
    await connectToDatabase();

    await Image.findByIdAndDelete(imageId);

    revalidatePath("/");
  } catch (error) {
    handleError(error);
  } finally {
    redirect("/");
  }
};

export const getAllImages = async ({
  limit = 9,
  page = 1,
  searchQuery = "",
}: AllImagesParams): Promise<AllImagesData | undefined> => {
  try {
    await connectToDatabase();

    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    let expression = "folder=artivision";

    if (searchQuery) {
      expression += ` AND ${searchQuery}`;
    }

    const { resources } = await cloudinary.search
      .expression(expression)
      .execute();

    const resourceIds = resources.map((resource: any) => resource.public_id);

    let query = {};

    if (searchQuery) {
      query = {
        publicId: {
          $in: resourceIds,
        },
      };
    }

    const skipAmount = (Number(page) - 1) * limit;

    const images = await Image.find(query)
      .sort({ updatedAt: -1 })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: "author",
        model: User,
        select: "_id firstName lastName clerkId",
      });

    const totalImages = await Image.find(query).countDocuments();
    const savedImages = await Image.find().countDocuments();

    return {
      data: JSON.parse(JSON.stringify(images)),
      totalPages: Math.ceil(totalImages / limit),
      savedImages,
    };
  } catch (error) {
    handleError(error);
  }
};
