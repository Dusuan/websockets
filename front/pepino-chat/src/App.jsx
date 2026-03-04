import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="bg-green-500 min-w-full min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
