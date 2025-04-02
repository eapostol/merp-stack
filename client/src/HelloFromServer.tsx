import React, { useEffect, useState } from "react";
import axios from "axios";

const HelloFromServer: React.FC = () => {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    axios.get("/api/hello")
      .then(response => setMessage(response.data.message))
      .catch(error => setMessage("Error fetching message from server- " + error.message));
  }, []);

  return <p>{message}</p>;
};

export default HelloFromServer;