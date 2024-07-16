import './App.css';
import ArticleList from './component/articleList/ArticleList';

function App() {
  return (
    <div className="App">
      <section className="container mx-auto p-2 w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">NY Times Most Popular Articles</h1>
        <ArticleList />
      </section>
    </div>
  );
}

export default App;
