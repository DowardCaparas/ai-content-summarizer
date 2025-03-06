"use client";
import { useState, useEffect } from "react";
import SideNav from "./ui/sidenav";
import Image from "next/image";

const Home = () => {
  const [isOpen, setisOpen] = useState(false);
  const [article, setArticle] = useState("");
  const [articleID, setArticleID] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [selectedSummary, setSelectedSummary] = useState<string | null>(null);
  const [savedArticles, setSavedArticles] = useState<
    { id: string; article: string; summary: string }[]
  >([]);

  useEffect(() => {
    const stored = localStorage.getItem("savedSummaries");
    if (stored) {
      setSavedArticles(JSON.parse(stored));
    }
  }, []);

  const summarizeArticle = async () => {
    if (!article.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ article }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch summary.");
      }

      const data = await res.json();
      const generatedSummary = data.summary || "Failed to summarize.";

      setSelectedArticle(article);
      setSelectedSummary(generatedSummary);

      const newArticleID = articleID || crypto.randomUUID();
      const newArticle = {
        id: newArticleID,
        article,
        summary: generatedSummary,
      };

      let savedSummaries = JSON.parse(
        localStorage.getItem("savedSummaries") || "[]"
      );

      const index = savedSummaries.findIndex(
        (item: { id: string }) => item.id === newArticleID
      );

      if (index !== -1) {
        savedSummaries[index] = newArticle;
      } else {
        savedSummaries = [newArticle, ...savedSummaries];
      }

      localStorage.setItem("savedSummaries", JSON.stringify(savedSummaries));
      setSavedArticles(savedSummaries);
      setArticle("");
      setArticleID(newArticleID);
    } catch (error) {
      setSelectedSummary(`Error occurred while summarizing. ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectArticle = (
    id: string,
    article: string,
    summary: string
  ) => {
    setSelectedArticle(article);
    setSelectedSummary(summary);
  };

  const handleDeleteArticle = (idToDelete: string) => {
    const updatedArticles = savedArticles.filter(
      (item) => item.id !== idToDelete
    );
    setSavedArticles(updatedArticles);
    localStorage.setItem("savedSummaries", JSON.stringify(updatedArticles));
  };

  return (
    <div className="flex">
      <div className="max-md:hidden">
        <SideNav
          savedArticles={savedArticles}
          onSelectArticle={handleSelectArticle}
          onDeleteArticle={handleDeleteArticle}
        />
      </div>
      {isOpen && (
        <div className="max-md:block hidden">
        <SideNav
          savedArticles={savedArticles}
          onSelectArticle={handleSelectArticle}
          onDeleteArticle={handleDeleteArticle}
        />
      </div>
      )}

      <button
        onClick={() => setisOpen((prev) => !prev)}
        className="absolute mt-2 ml-2 cursor-pointer hidden max-md:block"
      >
        <Image
          src={isOpen ? "/close.svg" : "/menu.svg"}
          alt="Pen icon"
          width={40}
          height={40}
          className="hover:bg-gray-200 p-2 rounded-md"
        />
      </button>

      <main className="p-5 w-full md:ml-64 text-center flex flex-col h-screen">
        {selectedArticle ? (
          <div className="my-14 bg-zinc-100 border border-gray-300 rounded-lg px-5 py-8 
          md:w-[80%] w-full mx-auto text-justify shadow h-full">
            <h2 className="text-lg font-bold">Article Title</h2>
            <span>{selectedArticle}</span>
            <h3 className="mb-2 mt-6 font-semibold">Summary</h3>
            <span>{selectedSummary}</span>
          </div>
        ) : (
          <div className="h-full">
            <span className="text-3xl font-semibold">AI Content Summarizer</span>
            <div className="input_area">
              <textarea
                className="p-2"
                placeholder="Enter the article here..."
                value={article}
                onChange={(e) => setArticle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault(); // Prevents adding a new line in textarea
                    summarizeArticle();
                  }
                }}
              />
              <button
                onClick={summarizeArticle}
                className="mt-2 py-2 px-4 bg-gray-900 text-white rounded-full font-medium cursor-pointer
                hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500
                transition-colors duration-150 ease-in"
                disabled={loading || !article.trim()}
              >
                <span className="text-sm">
                  {loading ? "Summarizing..." : "Summarize"}
                </span>
              </button>
            </div>
          </div>
        )}
        <footer className="inline-grid text-center mt-4">
          <span className="bottom-0">&copy; Dounhuward B. Caparas </span>
          <span>All rights reserved.</span>
        </footer>
      </main>
    </div>
  );
};

export default Home;
