import { notFound } from "next/navigation";
import GridDetails from "./GridDetails";
import BottomSectionWIthGraphicalSec from "./BottomSectionWIthGraphicalSec";

export const metadata = {
  title: "PumpZilla | Token",
  description: "Generated by create next app",
};

const Page = async ({ params }) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tokenOne?tokenAddress=${params.tokenAddress}`);

    if (!response.ok) {
      console.error(response.statusText);
      
      return notFound(); 
    }
    
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.log(contentType);
      return notFound();
    }

    const tokenData = await response.json();

    return (
      <main className="md:pt-24 pt-16 md:pl-20 pl-4 pr-4 md:pb-4 pb-16 w-screen">
        <GridDetails tokenData={tokenData} />

        <BottomSectionWIthGraphicalSec/>
      </main>
    );
  } catch (error) {
    console.error("Error fetching token data:", error);

    return notFound();
  }
};

export default Page
