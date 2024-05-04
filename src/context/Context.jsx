import React, { createContext, useCallback, useState } from "react";
import runChat from "../config/gemini";

// Create the context
export const Context = createContext();

// Context provider component
const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompts, setPreviousPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // Handler function to send the input to the chat
  const onSent = async () => {
    try {
      // Clear result data and set loading state
      setResultData("");
      setLoading(true);
      setShowResult(true);
      setRecentPrompt(input);

      // Call the chat function to get response
      const response = await runChat(input);

      // Process and format the response
      let formattedResponse = formatResponse(response);

      // Set the formatted response as the result data
      setResultData(formattedResponse);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      // Reset loading state and clear input field
      setLoading(false);
      setInput("");
    }
  };

  // Function to format response (example: split and format)
  const formatResponse = (response) => {
    let responseArray = response.split("**");
    let formattedResponse = "";

    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 === 0) {
        formattedResponse += responseArray[i];
      } else {
        formattedResponse += `<b>${responseArray[i]}</b>`;
      }
    }

    return formattedResponse;
  };

  // Memoized function to set previous prompts
  const setPrevPrompt = useCallback((prompts) => {
    setPreviousPrompts(prompts);
  }, []);

  // Context value object
  const contextValue = {
    previousPrompts,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  };

  // Provide the context value to the wrapped components
  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
