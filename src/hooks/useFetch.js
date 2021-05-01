import { useState, useEffect, useCallback } from 'react';

export default (defaultURL, defaultHeader = { method: 'GET' }) => {
  const [url, setURL] = useState(defaultURL);
  const [header, setHeader] = useState(defaultHeader);
  const [data, setData] = useState([]);

  const fetchUrl = useCallback(async () => {
    const response = await fetch(url, header);
    const json = await response.json();
    console.log(json);
    setData(json);
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
