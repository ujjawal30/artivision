import Link from "next/link";

import { navLinks } from "@/constants";
import { getAllImages } from "@/lib/actions/image.actions";
import Searchbar from "@/components/forms/Searchbar";
import ImageCard from "@/components/shared/ImageCard";
import Pagination from "@/components/miscellaneous/Pagination";
import HeroHeader from "@/components/shared/HeroHeader";

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.q as string) || "";

  const allImages = await getAllImages({ page, searchQuery });

  return (
    <main>
      <HeroHeader />

      <section className="sm:mt-12">
        <div className="md:flex justify-between items-center mb-6 flex flex-col gap-5 md:flex-row">
          <h2 className="text-3xl font-bold md:text-4xl text-dark-600">
            Recent Edits
          </h2>
          <Searchbar />
        </div>

        {allImages?.data?.length ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {allImages.data.map((image) => (
              <ImageCard image={image} key={image._id} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-60 w-full rounded-2xl border border-dark-400/10 bg-white/20">
            <p className="text-xl font-semibold">Empty List</p>
          </div>
        )}

        <Pagination page={page} totalPages={allImages?.totalPages} />
      </section>
    </main>
  );
};

export default Home;
