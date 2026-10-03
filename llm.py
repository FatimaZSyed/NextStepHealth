"""LLM layer: rewrites the matched advice in friendly plain language.
Falls back to a simple template if no API key is set, so the app still runs."""
import os
from dotenv import load_dotenv

load_dotenv()  # reads ANTHROPIC_API_KEY from your .env file

SYSTEM_PROMPT = """You explain lab results to patients in kind, plain language
(8th-grade reading level). Use ONLY the information provided. Do not add new
medical claims, diagnoses, or medication/supplement doses. For anything about
medication or supplements, tell the patient to ask their doctor or pharmacist.
End by reminding them this is educational and not a diagnosis."""


def simple_explanation(finding: dict) -> str:
    a = finding["advice"]
    lines = [a["meaning"], "", "**Things that may help:**"]
    lines += [f"- {d}" for d in a["diet"]]
    lines += ["", "**Questions to ask your doctor:**"]
    lines += [f"- {q}" for q in a["ask_doctor_about"]]
    lines += ["", "**Contact a doctor right away if you have:** " + ", ".join(a["urgent_if"])]
    return "\n".join(lines)


def explain(finding: dict) -> str:
    if not os.getenv("ANTHROPIC_API_KEY"):
        return simple_explanation(finding)

    try:
        import anthropic
        client = anthropic.Anthropic()
        prompt = (
            f"Lab: {finding['display_name']}\n"
            f"Result: {finding['value']} {finding['unit']} ({finding['status']})\n\n"
            f"Approved information to use:\n{finding['advice']}\n\n"
            "Write a short, friendly explanation with next steps."
        )
        response = client.messages.create(
            model="claude-sonnet-5-5",
            max_tokens=600,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": prompt}],
        )
        return response.content[0].text
    except Exception as e:
        # If the API fails during a demo, still show something useful
        return simple_explanation(finding)
