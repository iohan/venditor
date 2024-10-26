import { useQuery } from "@tanstack/react-query";

interface UseLoadOptions<TBody> {
  url: string;
  body?: TBody;
}

const useLoad = <TResponse, TBody = unknown>(
  options: UseLoadOptions<TBody>,
): {
  data?: TResponse;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
} => {
  const { url, body } = options;

  const fetchData = async (): Promise<TResponse> => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response.json();
  };

  const { data, isLoading, isError, isSuccess } = useQuery<TResponse>({
    queryKey: [url, body],
    queryFn: fetchData,
  });

  return { data, isLoading, isError, isSuccess };
};

export default useLoad;
