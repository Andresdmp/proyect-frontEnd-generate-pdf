// src/App.js
import React, { useState } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0);

  const downloadPDF = async () => {
    try {
      setCounter(0);
      setLoading(true);
      const response = await fetch("http://localhost:3000/generate_pdf", {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        console.log(typeof url);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "factura.pdf");
        document.body.appendChild(link);
        link.click();
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      } else {
        console.error("Failed to download PDF");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1 style={{ marginBottom: "20px", color: "#007bff" }}>
          Ejemplo React PDF
        </h1>
        <p style={{ marginBottom: "20px" }}>
          <strong>Autor:</strong> Andrés Daniel Moreno Prieto
        </p>
      </div>
      {loading ? (
        <>Loading...</>
      ) : (
        <button
          onClick={downloadPDF}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Download PDF
        </button>
      )}

      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        {counter}
      </button>
    </div>
  );
}

export default App;
