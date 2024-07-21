import BiodataForm from "./page.client";
import ilust from "../../../public/ilust1.png";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex h-full w-full">
        <div className="hidden lg:flex basis-1/2 justify-center bg-green-700 min-h-screen">
          <div className="fixed top-[50%] -translate-y-[50%]">
            <Image
              src={ilust}
              className=" mx-auto"
              alt="ilustration"
              width={480}
            />
            <div className="flex mx-auto w-[70%]">
              <p className=" mx-auto text-white">
                Isikan Data Diri anda sebelum memulai DISC Test. Pastikan
                seluruh data diri anda diisikan dengan benar.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mx-auto py-8 lg:basis-1/2 lg:px-[2%] ">
          <BiodataForm />
        </div>
      </div>
    </div>
  );
}
