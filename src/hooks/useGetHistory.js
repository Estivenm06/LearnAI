import { useState, useEffect } from "react";
import axios from "axios";

const useGetHistory = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await axios
        .get("/api/history/route")
        .then(({ data }) => {
          setData(data);
          setLoading(false);
        })
        .catch(({ response }) => setError(response.data.error));
    })();
  }, []);

  return { data, error, loading };
};

export { useGetHistory };
