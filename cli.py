"""Plain-Python version (no Streamlit, no installs needed).
Run with: python3 cli.py
Needs rules.py and knowledge_base.json in the same folder."""
from rules import analyze, load_knowledge_base

DISCLAIMER = "This tool is educational only and is not a diagnosis. Please review your results with your doctor."


def ask_number(prompt):
    """Ask for a number. Press Enter to skip. Re-asks if the input isn't a number."""
    while True:
        text = input(prompt).strip()
        if text == "":
            return None
        try:
            value = float(text)
            if value < 0:
                print("  Please enter a positive number.")
                continue
            return value
        except ValueError:
            print("  That doesn't look like a number. Try again, or press Enter to skip.")


def print_finding(f):
    a = f["advice"]
    print("\n" + "=" * 50)
    print(f"{f['display_name']}: {f['value']:g} {f['unit']} ({f['status'].upper()})")
    print("=" * 50)
    print(a["meaning"])
    print("\nThings that may help:")
    for item in a["diet"]:
        print(f"  - {item}")
    print("\nQuestions to ask your doctor:")
    for item in a["ask_doctor_about"]:
        print(f"  - {item}")
    print("\nContact a doctor right away if you have:")
    print("  " + ", ".join(a["urgent_if"]))


def main():
    print("Lab Results Helper (use fake/sample data only)")
    print("Press Enter to skip any lab you don't have.\n")

    kb = load_knowledge_base()
    labs = {}
    for marker, entry in kb.items():
        labs[marker] = ask_number(f"{entry['display_name']} ({entry['unit']}): ")

    findings = analyze(labs)

    if not findings:
        print("\nAll of the results you entered are within the usual range.")
    for f in findings:
        print_finding(f)

    print("\n" + DISCLAIMER)


if __name__ == "__main__":
    main()
