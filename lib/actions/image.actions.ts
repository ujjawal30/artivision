"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "../mongoose";
import Image, { IImage } from "../models/image.model";
import { handleError } from "../utils";
import User from "../models/user.model";
import { redirect } from "next/navigation";

export const addImage = async ({
  image,
  userId,
  path,
}: AddImageParams): Promise<IImage | undefined> => {
  try {
    await connectToDatabase();

    const author = await User.findById(userId);

    if (!author) handleError("User not found");

    const newImage = await Image.create({
      ...image,
      author: author?._id,
    });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newImage));
  } catch (error) {
    handleError(error);
  }
};
export const getImage = async (
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
export const updateImage = async ({
  image,
  userId,
  path,
}: UpdateImageParams): Promise<IImage | undefined> => {
  try {
    await connectToDatabase();

    const imageToUpdate = await Image.findById(image._id);

    if (!imageToUpdate || imageToUpdate.author?._id !== userId)
      handleError("Unauthorized or image not found");

    const updatedImage = await Image.findByIdAndUpdate(image._id, image, {
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
