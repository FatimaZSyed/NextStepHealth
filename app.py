"""Streamlit UI. Run with: streamlit run app.py"""
import streamlit as st
from rules import analyze
from llm import explain

st.set_page_config(page_title="Lab Results Helper", page_icon="🩺")
st.title("🩺 Lab Results Helper")
st.caption("Educational only. This is not a diagnosis. Use fake/sample data only.")

st.subheader("Enter your results")
col1, col2, col3 = st.columns(3)
ferritin = col1.number_input("Ferritin (ng/mL)", min_value=0.0, value=50.0)
ldl = col2.number_input("LDL (mg/dL)", min_value=0.0, value=100.0)
vitamin_d = col3.number_input("Vitamin D (ng/mL)", min_value=0.0, value=40.0)

if st.button("Get my next steps"):
    labs = {"ferritin": ferritin, "ldl": ldl, "vitamin_d": vitamin_d}
    findings = analyze(labs)

    if not findings:
        st.success("All of these results are within the usual range.")
    for f in findings:
        st.markdown(f"### {f['display_name']}: {f['value']} {f['unit']} ({f['status']})")
        st.markdown(explain(f))
        st.divider()

    st.warning("This tool does not replace your doctor. Please review results with your care team.")
