import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { BadgeIndianRupeeIcon, ImagesIcon } from "lucide-react";

import { getUser } from "@/lib/actions/user.actions";
import { getUserImages } from "@/lib/actions/image.actions";
import Header from "@/components/miscellaneous/Header";
import ImageCard from "@/components/shared/ImageCard";
import Pagination from "@/components/miscellaneous/Pagination";

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;

  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const user = await getUser(userId);
  if (!user) redirect("/");

  const images = await getUserImages({ page, userId: user._id, limit: 2 });

  return (
    <div>
      <Header title="Profile" />

      <section className="mt-8 flex flex-col gap-5 sm:flex-row md:mt-8 md:gap-10">
        <div className="w-full rounded-2xl border-2 border-claret-200/20 bg-white p-5 shadow-lg shadow-claret-200/10 md:px-6 md:py-8">
          <p className="max-sm:text-sm font-medium">CREDITS AVAILABLE</p>
          <div className="mt-4 flex items-center gap-4">
            <BadgeIndianRupeeIcon size={48} />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-600">
              {user.creditBalance}
            </h2>
          </div>
        </div>

        <div className="w-full rounded-2xl border-2 border-claret-200/20 bg-white p-5 shadow-lg shadow-claret-200/10 md:px-6 md:py-8">
          <p className="max-sm:text-sm font-medium">IMAGE MANIPULATION DONE</p>
          <div className="mt-4 flex items-center gap-4">
            <ImagesIcon size={48} />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-600">
              {images?.data.length}
            </h2>
          </div>
        </div>
      </section>

      <section className="mt-8 md:mt-14">
        <h2 className="text-3xl font-bold md:text-4xl text-gray-600 mb-6">
          My Transformations
        </h2>

        {images?.data?.length ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {images.data.map((image) => (
              <ImageCard image={image} key={image._id} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-60 w-full rounded-2xl border border-gray-400/10 bg-white/20">
            <p className="text-xl font-semibold">Empty List</p>
          </div>
        )}

        <Pagination page={page} totalPages={images?.totalPages} />
      </section>
    </div>
  );
};

export default ProfilePage;
