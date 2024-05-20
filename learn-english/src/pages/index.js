import Banner from "@/components/Banner";
import CardList from "@/components/CardList/CardList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="max-w-[1035px] mx-auto flex flex-col gap-10 relative">
      <Banner />
      <Header className="left-1/2 transform -translate-x-1/2" />
      <section className=" p-4 bg-white rounded-md shadow-md flex flex-col">
        <h2 className="poetsen-font text-[38px] text-center">Courses</h2>
        <CardList />
      </section>
      <section className="p-4 bg-neutral-100 rounded-md shadow-md flex flex-col items-center text-black">
        <h2 className="poetsen-font text-[38px] text-center mb-4">
          Why Learn with Us?
        </h2>
        <p className="text-lg text-center max-w-[800px]">
          At our learning platform, we believe in providing high-quality,
          engaging, and interactive English courses that cater to all levels.
          Our experienced instructors, state-of-the-art materials, and
          personalized approach ensure that you achieve your language goals
          efficiently and enjoyably.
        </p>
      </section>
      <Footer />
    </div>
  );
}
