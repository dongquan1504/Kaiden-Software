import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import Menu from "@/components/common/menu";
import About from "@/components/section/about";
import Calendar from "@/components/section/calendar";

export default function Home() {
  return (
    <div>
      {/* <Menu /> */}
      <SidebarProvider>
        <Menu />
        <div className="w-full h-screen flex flex-col justify-between">
          <div>
            <Header />
            <SidebarTrigger />
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start p-8">
              <About />
              <Calendar />
            </main>
          </div>
          <Footer />
        </div>
      </SidebarProvider>
    </div>
  );
}
