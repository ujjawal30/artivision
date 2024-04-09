import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Homepage
      <UserButton />
    </main>
  );
};

export default Home;
