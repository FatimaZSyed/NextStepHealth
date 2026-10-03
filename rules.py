"""Rules layer: compares lab values to ranges and picks matching advice.
This part is plain Python (no AI), so results are predictable and testable."""
import json
from pathlib import Path

KB_PATH = Path(__file__).parent / "knowledge_base.json"


def load_knowledge_base():
    with open(KB_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def analyze(labs: dict) -> list:
    """labs example: {"ferritin": 12, "ldl": 150}
    Returns a list of findings for values outside the normal range."""
    kb = load_knowledge_base()
    findings = []

    for marker, value in labs.items():
        if marker not in kb or value is None:
            continue
        entry = kb[marker]

        status = "normal"
        low_limit = entry.get("low_below")
        high_limit = entry.get("high_above")
        if low_limit is not None and value < low_limit:
            status = "low"
        elif high_limit is not None and value > high_limit:
            status = "high"

        if status == "normal":
            continue

        findings.append({
            "marker": marker,
            "display_name": entry["display_name"],
            "value": value,
            "unit": entry["unit"],
            "status": status,
            "advice": entry[status],
        })
    return findings


if __name__ == "__main__":
    # Quick test: python rules.py
    print(analyze({"ferritin": 12, "ldl": 150, "vitamin_d": 35}))
