import { knowledgeBase } from "./knowledgeBase";

export function analyzeLabs(labs) {
  const findings = [];

  for (const [marker, rawValue] of Object.entries(labs)) {
    if (rawValue === "" || rawValue === null || rawValue === undefined) {
      continue;
    }

    const entry = knowledgeBase[marker];
    if (!entry) continue;

    const value = Number(rawValue);
    if (Number.isNaN(value) || value < 0) continue;

    let status = "normal";

    if (entry.lowBelow !== null && value < entry.lowBelow) {
      status = "low";
    } else if (entry.highAbove !== null && value > entry.highAbove) {
      status = "high";
    }

    if (status === "normal") continue;

    findings.push({
      marker,
      displayName: entry.displayName,
      value,
      unit: entry.unit,
      status,
      advice: entry[status],
    });
  }

  return findings;
}
