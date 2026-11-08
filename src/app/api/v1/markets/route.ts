import { NextResponse } from "next/server";
import { getAllMarkets, REGIONAL_PRICING } from "@/lib/markets";

export async function GET() {
  const markets = getAllMarkets();
  return NextResponse.json({
    success: true,
    data: {
      markets,
      pricing: REGIONAL_PRICING,
    },
  });
}

