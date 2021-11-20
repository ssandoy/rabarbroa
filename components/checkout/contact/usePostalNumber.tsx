import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const usePostalNumber = (): [
  { city: string; isLoading: boolean; isError: boolean },
  Dispatch<SetStateAction<string>>
] => {
  const delay = 500;
  const [city, setCity] = useState(null);
  const [postalNumber, setPostalNumber] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (postalNumber) {
        setIsError(false);
        setIsLoading(true);

        try {
          const result = await fetch(
            `https://ws.geonorge.no/adresser/v1/sok?postnummer=${postalNumber}`
          );

          const d = await result.json();
          setCity(d.adresser[0].poststed);
        } catch (error) {
          setIsError(true);
        }

        setIsLoading(false);
      }
    };

    const handler = setTimeout(() => {
      fetchData();
    }, delay);
    return () => clearTimeout(handler);
  }, [postalNumber]);

  return [{ city, isLoading, isError }, setPostalNumber];
};
