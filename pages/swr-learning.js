import useSWR from "swr";
import Layout from "../components/layout/layout";
import { useState } from "react";

function fetcher(url) {
  return fetch(url).then((res) => res.json());
}

export default function SwrLearning() {
  const [initialFetch, setInitialFetch] = useState(false);
  const [quote, setQuote] = useState(null);

  const { data, error } = useSWR(
    initialFetch ? "https://api.kanye.rest" : null,
    fetcher
  );

  function handleStart() {
    setInitialFetch(true);
  }

  async function handleMoreClick() {
    const { quote } = await fetcher("https://api.kanye.rest");

    setQuote(quote);
  }

  return (
    <Layout>
      <h1>SWR</h1>
      <p>
        Random Kanye quote from{" "}
        <a
          href={"https://kanye.rest/"}
          target="_blank"
          rel="noopener noreferrer"
        >
          kanye.rest
        </a>{" "}
        API
      </p>
      {!quote && !data && <button onClick={handleStart}>I'm ready</button>}
      {data && <q>{!quote ? data.quote : quote}</q>}
      {(quote || data) && (
        <button onClick={handleMoreClick}>I need more!!</button>
      )}
      <style jsx>{`
        q {
          font-style: italic;
        }

        button {
          margin-top: 1rem;
          background: transparent;
          padding: 0.4rem;
          display: block;
          font-size: 0.7rem;
          border: 2px solid #0070f3;
          color: #0070f3;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 20px;
        }
      `}</style>
    </Layout>
  );
}
