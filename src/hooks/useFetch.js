import { useState, useCallback, useEffect } from 'react';

// Header가 아니라 Option으로 바꾸기

export default (defaultURL, defaultHeader = { method: 'GET' }) => {
  const [url, setURL] = useState(defaultURL);
  const [header, setHeader] = useState(defaultHeader);
  const [data, setData] = useState([]);

  const fetchUrl = useCallback(async () => {
    const response = await fetch(url, header);
    const json = await response.json();
    console.log(json);
    if (header.method === 'GET' || header.method === 'PATCH') {
      setData((prevState) => [...prevState, ...json]);
    }
  }, [url, header]);

  useEffect(() => {
    try {
      fetchUrl();
    } catch (error) {
      console.error(error);
    }
  }, [fetchUrl]);

  return { data, setURL, setHeader, fetchUrl };
};
