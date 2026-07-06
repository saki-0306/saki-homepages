import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Genre from './pages/Genre'
import Article from './pages/Article'
import Profile from './pages/Profile'
import News from './pages/News'
import Gallery from './pages/Gallery'
import Books from './pages/Books'
import Book from './pages/Book'
import NotFound from './pages/NotFound'
import { C } from './theme'

// ルート遷移のたびにページ先頭へスクロールする
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: C.paper, overflowX: 'hidden' }}>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genre/:slug" element={<Genre />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/news" element={<News />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:slug" element={<Book />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}
