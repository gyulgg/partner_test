import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PartnerSuccessTest from "./PartnerSuccessTest";
import ResultPage from "./ResultPage"; // 새로 만든 결과 페이지

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PartnerSuccessTest />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;

