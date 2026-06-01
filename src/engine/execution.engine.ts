export type Portfolio = {
  balance: number;
  positions: Record<string, number>;
  history: Array<{
    asset: string;
    action: "BUY" | "SELL";
    amount: number;
    price: number;
    timestamp: number;
  }>;
};

/**
 * In-memory portfolio (v1 simulation)
 */
let portfolio: Portfolio = {
  balance: 10000,
  positions: {},
  history: []
};

/**
 * Execute trade (simulation only)
 */
export function executeTrade(
  asset: string,
  action: "BUY" | "SELL",
  amount: number,
  price: number
): Portfolio {
  const cost = amount * price;

  // BUY logic
  if (action === "BUY") {
    if (portfolio.balance < cost) {
      throw new Error("Insufficient balance");
    }

    portfolio.balance -= cost;
    portfolio.positions[asset] =
      (portfolio.positions[asset] || 0) + amount;
  }

  // SELL logic
  if (action === "SELL") {
    portfolio.balance += cost;
    portfolio.positions[asset] =
      (portfolio.positions[asset] || 0) - amount;
  }

  // record history
  portfolio.history.push({
    asset,
    action,
    amount,
    price,
    timestamp: Date.now()
  });

  return portfolio;
}

/**
 * Get current portfolio state
 */
export function getPortfolio(): Portfolio {
  return portfolio;
}

/**
 * Reset portfolio (useful for testing)
 */
export function resetPortfolio(): void {
  portfolio = {
    balance: 10000,
    positions: {},
    history: []
  };
}
