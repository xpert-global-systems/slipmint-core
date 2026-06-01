import { generateSignal } from "../engine/signal.engine";
import { riskCheck } from "../engine/risk.engine";
import { executeTrade, getPortfolio } from "../engine/execution.engine";

export type TradeRequest = {
  asset: string;
  amount: number;
  price: number;
};

export function processTrade(request: TradeRequest) {
  const { asset, amount, price } = request;

  const signal = generateSignal(price, asset);

  if (signal.action === "HOLD") {
    return {
      status: "SKIPPED",
      reason: signal.reason,
      portfolio: getPortfolio()
    };
  }

  const risk = riskCheck(amount, getPortfolio().balance);

  if (!risk.approved) {
    return {
      status: "REJECTED",
      reason: risk.reason,
      signal,
      risk,
      portfolio: getPortfolio()
    };
  }

  const portfolio = executeTrade(asset, signal.action, amount, price);

  return {
    status: "EXECUTED",
    signal,
    risk,
    portfolio
  };
}
