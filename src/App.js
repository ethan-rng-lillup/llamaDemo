import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const [initialPrompt, setInitialPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    async function query(data) {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct",
        {
          headers: {
            Authorization: "Bearer hf_xxxxxxxxxxxxxx",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      return result;
    }

    const requestData = {
      inputs: `${initialPrompt} ${userPrompt}`,
    };

    query(requestData)
      .then((response) => {
        setResponse(response);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error making API request:", error);
      });
  };

  return (
    <div className="app-container">
      <h1>Interact with Llama 3</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="initialPrompt">Initial Prompt:</label>
          <textarea
            id="initialPrompt"
            value={initialPrompt}
            onChange={(e) => setInitialPrompt(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="userPrompt">User Prompt:</label>
          <textarea
            id="userPrompt"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {response && (
        <div className="response">
          <h2>Response:</h2>
          <p>{response[0].generated_text}</p>
        </div>
      )}
    </div>
  );
};

export default App;
