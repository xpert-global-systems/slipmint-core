export type SignalAction = "BUY" | "SELL" | "HOLD";

export type Signal = {
  asset: string;
  action: SignalAction;
  confidence: number;
  reason: string;
};

/**
 * Simple deterministic signal engine (v1)
 * Later this will be replaced by slipmint-ai integration
 */
export function generateSignal(price: number, asset: string = "BTC"): Signal {
  // Basic logic zones (placeholder structure)
  const highZone = 60000;
  const lowZone = 30000;

  if (price >= highZone) {
    return {
      asset,
      action: "SELL",
      confidence: 0.65,
      reason: "Price in high resistance zone"
    };
  }

  if (price <= lowZone) {
    return {
      asset,
      action: "BUY",
      confidence: 0.7,
      reason: "Price in accumulation zone"
    };
  }

  return {
    asset,
    action: "HOLD",
    confidence: 0.5,
    reason: "Neutral market conditions"
  };
}