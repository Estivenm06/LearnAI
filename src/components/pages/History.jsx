import React from "react";
import { useGetHistory } from "../../hooks/useGetHistory";

const History = () => {
  const { data, error, loading } = useGetHistory();
  
  if(loading) return <div>Loading...</div>
    
  return <main></main>;
};

export { History };
