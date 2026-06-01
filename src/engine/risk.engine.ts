export type RiskResult = {
  approved: boolean;
  reason: string;
  exposure: number;
};

/**
 * Risk Engine v1
 * Controls trade safety before execution
 */
export function riskCheck(
  tradeAmount: number,
  portfolioBalance: number,
  maxExposure: number = 0.2
): RiskResult {
  // calculate exposure (how much of portfolio is being used)
  const exposure = tradeAmount / portfolioBalance;

  // rule 1: too much risk
  if (exposure > maxExposure) {
    return {
      approved: false,
      reason: `Exposure too high (${(exposure * 100).toFixed(2)}%)`,
      exposure
    };
  }

  // rule 2: invalid values
  if (tradeAmount <= 0) {
    return {
      approved: false,
      reason: "Invalid trade amount",
      exposure
    };
  }

  // rule 3: portfolio too small safety check
  if (portfolioBalance < 100) {
    return {
      approved: false,
      reason: "Portfolio balance too low for trading",
      exposure
    };
  }

  return {
    approved: true,
    reason: "Risk check passed",
    exposure
  };
}
