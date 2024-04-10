"use server";

import { revalidatePath } from "next/cache";
import User, { IUser } from "../models/user.model";
import { connectToDatabase } from "../mongoose";
import { handleError } from "../utils";

export const createUser = async (
  user: CreateUserParams
): Promise<IUser | undefined> => {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
};

export const getUser = async (userId: string): Promise<IUser | undefined> => {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId });
    if (!user) handleError("User not found!!!");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
};

export const updateUser = async (
  userId: string,
  user: UpdateUserParams
): Promise<IUser | undefined> => {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId: userId }, user, {
      new: true,
    });
    if (!updatedUser) handleError("User update failed!!!");

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
};

export const deleteUser = async (userId: string): Promise<void> => {
  try {
    await connectToDatabase();

    const userToDelete = await User.findOne({ clerkId: userId });
    if (!userToDelete) handleError("User not found!!!");

    const deletedUser = await User.findByIdAndDelete(userToDelete?._id);
    if (!deletedUser) handleError("User delete failed!!!");

    revalidatePath("/");
  } catch (error) {
    handleError(error);
  }
};
