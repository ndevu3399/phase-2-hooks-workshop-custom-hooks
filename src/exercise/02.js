import { useEffect, useState } from "react";

export function usePokemon(name) {
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    if (!name) return;

    setStatus("pending");
    setErrors(null);
    setData(null);

    fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Not found");
        }
        return res.json();
      })
      .then((json) => {
        setData(json);
        setStatus("fulfilled");
      })
      .catch((err) => {
        setErrors([err.message]);
        setStatus("rejected");
      });
  }, [name]);

  return { data, errors, status };
}
