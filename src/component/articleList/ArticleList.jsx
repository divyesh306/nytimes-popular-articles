import React, { useState, useEffect } from 'react';
import ArticleDetails from '../articleDetails/ArticleDetails';
import Apiservices from '../../services/Apiservices';
import NewsCard from './NewsCard';
import { getPopulerNews } from '../../store/slices/mostPopulerNewssSlice';
import { useDispatch, useSelector } from 'react-redux';

function ArticleList() {
  const dispatch = useDispatch();
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = useSelector((state) => state.populernewsSlice.populerNews);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await Apiservices.getMostPopularArticles(7); // Fetch for a week
      dispatch(getPopulerNews(data));
    };

    if(!articles.length) {
      fetchArticles();
   }
  },[articles, dispatch]); // Only fetch once when the component mounts


  const selectArticle = (article) => {
    setSelectedArticle(article);
  };

  return (
    <>
      {!selectedArticle ? (
        <div className="flex flex-wrap justify-center w-full">
          {articles.map((article) => (
            <div key={article.id} className="w-full md:w-1/4 p-1">
              <NewsCard article={article} onArticleClick={selectArticle} />
            </div>
          ))}
        </div>
      )
        : <ArticleDetails article={selectedArticle} onBacktoList={selectArticle}/>}
    </>
  );
}

export default ArticleList;