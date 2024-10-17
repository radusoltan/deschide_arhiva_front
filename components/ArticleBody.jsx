"use client"
import React from 'react'
import parse from 'html-react-parser'
const ArticleBody = ({article}) => {
  const options = {
    replace: (domNode) => {
      if (domNode.name === 'p') {
        // Adaugă clasa Tailwind la elementele <p>
        return <p className="mb-5 text-gray-800">{domNode.children}</p>;
      }
      if (domNode.name === 'h1') {
        // Adaugă clasa Tailwind la elementele <h1>
        return <h1 className="text-3xl font-bold mb-3">{domNode.children}</h1>;
      }
      // Continuă pentru alte elemente dacă este necesar
    },
  };

  return <div>{parse(article.body, options)}</div>;
}

export default ArticleBody