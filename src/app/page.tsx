import { Footer, Header, PlanCard, UniOffer } from "@/components";

export default function Home() {
  return (
    <>
      <Header active="discover" />
      <main className="@container mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-12 px-6 py-16 sm:px-12 lg:px-20">
        <h1 className="font-display text-display-section-mobile sm:text-display-section">Wähle dein Abo</h1>
        <div className="grid gap-6 @4xl:grid-cols-3">
          <PlanCard plan="monthly" />
          <PlanCard plan="yearly" />
          <PlanCard plan="plus" />
        </div>
        <UniOffer />
      </main>
      <Footer locale="de" />
    </>
  );
}
