import { useCallback, useEffect, useState } from 'react';

export const usePagination = (totalPosts: number, postsPerPage: number = 6) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const toggleCardsVisibility = useCallback(() => {
    const container = document.querySelector('[data-blog-list-container]');
    if (!container) return;

    const cards = Array.from(
      container.querySelectorAll<HTMLElement>('[data-blog-card]'),
    );
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;

    cards.forEach((card, index) => {
      card.classList.toggle('hidden', index < startIndex || index >= endIndex);
    });
  }, [currentPage, postsPerPage]);

  useEffect(() => {
    toggleCardsVisibility();
  }, [toggleCardsVisibility]);

  return { currentPage, totalPages, setCurrentPage };
};
