import { useEffect, useState } from "react";

interface UseLoadOptions<TResponse, TBody> {
  url: string;
  body?: TBody;
  onSuccess?: (data: TResponse) => void;
  onError?: (error: Error) => void;
}

const useLoad = <TResponse, TBody = unknown>(
  options: UseLoadOptions<TResponse, TBody>,
) => {
  const { url, body, onSuccess, onError } = options;
  const [data, setData] = useState<TResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const result: TResponse = await response.json();
        setData(result);
        if (onSuccess) {
          onSuccess(result);
        }
      } catch (e) {
        const fetchError =
          e instanceof Error ? e : new Error("Unknown error occurred");
        setError(fetchError);
        if (onError) {
          onError(fetchError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [body, onError, onSuccess, url]);

  return { data, loading, error };
};

export default useLoad;
