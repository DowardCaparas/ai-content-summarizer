"use client";
import { useState } from "react";
import Image from "next/image";
import SideNavSkeleton from "./skeleton";

type ArticleProps = {
  id: string;
  article: string;
  summary: string;
};

const SideNav = ({
  savedArticles,
  onSelectArticle,
  onDeleteArticle,
}: {
  savedArticles: ArticleProps[];
  onSelectArticle: (id: string, article: string, summary: string) => void;
  onDeleteArticle: (id: string) => void;
}) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);

  const handleNewChat = () => {
    window.location.reload();
  };

  const handleSelectArticle = (
    id: string,
    article: string,
    summary: string
  ) => {
    setSelectedArticleId(id);
    onSelectArticle(id, article, summary);
  };

  const handleDeleteClick = (id: string) => {
    setArticleToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (articleToDelete) {
      onDeleteArticle(articleToDelete);
      setArticleToDelete(null);
    }
    setShowModal(false);
  };

  return (
    <>
      <div
        className="h-screen xl:w-[19%] lg:w-[23%] md:w-[32%] sm:w-[45%] w-[80%] bg-[#F9F9F9] 
        p-2 fixed max-md:absolute overflow-y-auto pb-24 "
      >
        <div className="mb-8  flex items-center justify-end">
          <button className="cursor-pointer" onClick={handleNewChat}>
            <Image
              src="/square-pen.svg"
              alt="Pen icon"
              width={37}
              height={37}
              className="hover:bg-[#ececec]  p-2 rounded-md"
            />
          </button>
        </div>

        {savedArticles.length === 0 ? (
          
          <SideNavSkeleton />
          
        ) : (
          <div className="space-y-2">
            <span className="font-medium">History</span>
            {savedArticles.map((item) => (
              <div key={item.id} className="flex justify-between items-center gap-1 mt-2">
                <div
                  className={`px-3 py-1 rounded-md cursor-pointer hover:bg-gray-200 
                    transition-colors duration-50 ease-in w-full
                    ${item.id === selectedArticleId ? "bg-gray-300" : ""}`}
                  onClick={() => handleSelectArticle(item.id, item.article, item.summary)}
                >
                  <span className="truncate text-sm flex-1">{item.article}</span>
                </div>
                <button
                  className="p-2 rounded-md cursor-pointer hover:bg-white active:bg-gray-100
                    transition-colors duration-150 ease-in absolute right-0 bg-[#F9F9F9]"
                  onClick={() => handleDeleteClick(item.id)}
                >
                  <Image src="/trash.svg" alt="Delete icon" width={20} height={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white border-2 border-gray-400 p-6 rounded-xl shadow-md text-center">
            <h2 className="text-lg font-semibold mb-2">Confirm Deletion</h2>
            <p>Are you sure you want to delete this article?</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-200 cursor-pointer
                active:bg-gray-300"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-400 cursor-pointer
                active:bg-red-500"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideNav;
