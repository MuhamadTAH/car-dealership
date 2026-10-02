import qistPlansRaw from "@/data/qistPlans.json";
import { QistPlan } from "./types";
import { USD_TO_IQD_RATE } from "./utils";

const qistPlans = qistPlansRaw as unknown as Record<string, QistPlan>;

export function getCarQist(carId: number): QistPlan | null {
  const plan = qistPlans[String(carId)];
  if (!plan || !plan.available) return null;
  return plan;
}

export function isQistAvailable(carId: number): boolean {
  const plan = qistPlans[String(carId)];
  return Boolean(plan && plan.available);
}

export interface QistCalculation {
  priceUsd: number;
  priceIqd: number;
  downPaymentPercent: number;
  downPaymentUsd: number;
  downPaymentIqd: number;
  financedAmountUsd: number;
  financedAmountIqd: number;
  months: number;
  monthlyUsd: number;
  monthlyIqd: number;
  exchangeRate: number;
}

export function calculateQistDetails(
  carPriceUsd: number,
  downPaymentPercent: number,
  months: number,
  exchangeRate: number = USD_TO_IQD_RATE
): QistCalculation {
  const priceIqd = Math.round(carPriceUsd * exchangeRate);
  const downPaymentUsd = Math.round(carPriceUsd * (downPaymentPercent / 100));
  const downPaymentIqd = Math.round(downPaymentUsd * exchangeRate);
  const financedAmountUsd = Math.max(0, carPriceUsd - downPaymentUsd);
  const financedAmountIqd = Math.round(financedAmountUsd * exchangeRate);
  
  const validMonths = months > 0 ? months : 12;
  const monthlyUsd = Math.round(financedAmountUsd / validMonths);
  const monthlyIqd = Math.round(monthlyUsd * exchangeRate);

  return {
    priceUsd: carPriceUsd,
    priceIqd,
    downPaymentPercent,
    downPaymentUsd,
    downPaymentIqd,
    financedAmountUsd,
    financedAmountIqd,
    months: validMonths,
    monthlyUsd,
    monthlyIqd,
    exchangeRate,
  };
}
