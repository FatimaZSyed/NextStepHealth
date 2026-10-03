import { useState } from "react";
import { knowledgeBase } from "./knowledgeBase";
import { analyzeLabs } from "./analyze";

const DISCLAIMER =
  "This tool is educational only and is not a diagnosis. Please review your results with your doctor.";

function ResultCard({ finding }) {
  const { advice } = finding;

  return (
    <article className={`result-card ${finding.status}`}>
      <div className="result-heading">
        <div>
          <p className="eyebrow">{finding.status.toUpperCase()}</p>
          <h3>{finding.displayName}</h3>
        </div>
        <div className="result-value">
          {finding.value} <span>{finding.unit}</span>
        </div>
      </div>

      <p className="meaning">{advice.meaning}</p>

      <div className="result-section">
        <h4>Things that may help</h4>
        <ul>
          {advice.diet.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="result-section">
        <h4>Questions to ask your doctor</h4>
        <ul>
          {advice.askDoctorAbout.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="urgent-box">
        <strong>Contact a doctor right away if you have:</strong>
        <p>{advice.urgentIf.join(", ")}</p>
      </div>
    </article>
  );
}

export default function App() {
  const [labs, setLabs] = useState({
    ferritin: "",
    ldl: "",
    vitamin_d: "",
  });
  const [findings, setFindings] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setLabs((previous) => ({ ...previous, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const enteredValues = Object.values(labs).filter((value) => value !== "");

    if (enteredValues.length === 0) {
      setFindings([]);
      setSubmitted(false);
      setError("Enter at least one lab result.");
      return;
    }

    if (enteredValues.some((value) => Number(value) < 0)) {
      setFindings([]);
      setSubmitted(false);
      setError("Lab values must be positive numbers.");
      return;
    }

    setFindings(analyzeLabs(labs));
    setSubmitted(true);
  }

  function clearForm() {
    setLabs({ ferritin: "", ldl: "", vitamin_d: "" });
    setFindings([]);
    setSubmitted(false);
    setError("");
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">PATIENT LAB HELPER</p>
          <h1>Understand your lab results in simple language.</h1>
          <p className="hero-copy">
            Enter any results you have. You can leave the other fields blank.
          </p>
        </div>
      </section>

      <section className="panel form-panel">
        <div className="panel-header">
          <div>
            <h2>Enter lab values</h2>
            <p>Use sample or non-identifying data for a class/demo project.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field-grid">
            {Object.entries(knowledgeBase).map(([marker, entry]) => (
              <label className="field" key={marker}>
                <span>{entry.displayName}</span>
                <div className="input-wrap">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    name={marker}
                    value={labs[marker]}
                    onChange={handleChange}
                    placeholder="Enter value"
                  />
                  <span className="unit">{entry.unit}</span>
                </div>
              </label>
            ))}
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="actions">
            <button className="primary-button" type="submit">
              Analyze Results
            </button>
            <button className="secondary-button" type="button" onClick={clearForm}>
              Clear
            </button>
          </div>
        </form>
      </section>

      {submitted && (
        <section className="results-section">
          <div className="section-title">
            <p className="eyebrow">RESULTS</p>
            <h2>Your summary</h2>
          </div>

          {findings.length === 0 ? (
            <div className="normal-card">
              <h3>No results were flagged by the current rules.</h3>
              <p>
                All of the values you entered are within the ranges used by this demo.
              </p>
            </div>
          ) : (
            <div className="results-grid">
              {findings.map((finding) => (
                <ResultCard key={finding.marker} finding={finding} />
              ))}
            </div>
          )}
        </section>
      )}

      <footer className="disclaimer">{DISCLAIMER}</footer>
    </main>
  );
}
