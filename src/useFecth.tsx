import React from 'react';

interface FecthState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(
  url: RequestInfo | URL,
  options?: RequestInit,
): FecthState<T> {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const optionsRef = React.useRef(options);
  optionsRef.current = options;

  React.useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fecthData = async () => {
      setLoading(true);
      setData(null);
      try {
        const response = await fetch(url, {
          signal,
          ...optionsRef.current,
        });
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const json = (await response.json()) as T;
        if (!signal.aborted) setData(json);
        console.log(response);
      } catch (error) {
        if (!signal.aborted && error instanceof Error) setError(error.message);
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    };
    fecthData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
