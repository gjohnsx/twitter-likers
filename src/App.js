import Navbar from "./components/Navbar";
import Header from "./components/Header";
import FormSection from "./components/FormSection";

export default function App() {
  return (
    <>
      <div className="min-h-full">
        <Navbar />
        <Header />
             
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-4 sm:px-0">
            {/* Replace with your content */}
            <FormSection />

            {/* /End replace */}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
