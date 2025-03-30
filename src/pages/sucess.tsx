import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen bg-navy flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-slate-light">
          <h1 className="text-3xl font-bold mb-6">Thank You for Your Purchase!</h1>
          <p className="mb-4">
            Your order has been successfully completed. If you purchased a digital product,
            please check your email for the download link (including your spam/junk folder).
          </p>
          <p className="mb-4">Session ID: {sessionId || "Not available"}</p>
          <a href="/" className="bg-mint text-navy hover:bg-mint/90 px-4 py-2 rounded inline-block text-center">
            Return to Store
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SuccessPage;