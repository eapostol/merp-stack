import React, { useEffect, useState } from "react";
import { fetchHelloMessage } from "../utilities/api";

const HelloFromServer: React.FC = () => {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetchHelloMessage()
      .then((data) => setMessage(data.message))
      .catch((error) => setMessage("Error fetching message from server - " + error.message));
  }, []);

  return <p>{message}</p>;
};

export default HelloFromServer;