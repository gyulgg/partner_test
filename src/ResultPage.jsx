import { useLocation } from "react-router-dom";
import { useEffect } from "react"; // 추가
import { questions, feedbackTemplate, summaryFeedback } from "./PartnerSuccessTest";

export default function ResultPage() {
  const location = useLocation();
  const answers = location.state?.answers || [];

  const totalScore = answers.reduce((sum, ans) => sum + ans.score, 0);

  const gradeInfo = summaryFeedback.find(
    (item) => totalScore >= item.minScore && totalScore <= item.maxScore
  );

  const scoredFeedback = answers
    .map((ans) => {
      const feedback = feedbackTemplate[ans.questionId]?.[ans.score];
      const question = questions.find((q) => q.id === ans.questionId)?.title || "";
      return { questionId: ans.questionId, score: ans.score, feedback, question };
    })
    .sort((a, b) => a.score - b.score);

  // Supabase 저장 useEffect
  // ResultPage.jsx

useEffect(() => {
  const partner_id = localStorage.getItem("partner_id"); // 수정된 부분
  if (!partner_id) return console.warn("❗ partner_id 없음");

  const payload = {
    partner_id,
    q1_score: answers[0]?.score || 0,
    q2_score: answers[1]?.score || 0,
    q3_score: answers[2]?.score || 0,
    q4_score: answers[3]?.score || 0,
    q5_score: answers[4]?.score || 0,
    total_score,
  };

  fetch(`${process.env.REACT_APP_SUPABASE_URL}/rest/v1/partner_test_results`, {
    method: "POST",
    headers: {
      apikey: process.env.REACT_APP_SUPABASE_ANON_KEY,
      Authorization: `Bearer ${process.env.REACT_APP_SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      console.log("🛰️ status:", res.status);
      return res.text();
    })
    .then((text) => console.log("📨 Supabase response body:", text))
    .catch((err) => console.error("❌ fetch error:", err));
}, []);
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-200 to-blue-500 p-6 text-white">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* 상단 결과 요약 */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl font-extrabold drop-shadow-md">성사율 진단 결과</h1>
          <div className="text-2xl font-bold">
            총점: <span className="text-white bg-blue-600 px-3 py-1 rounded-full shadow">{totalScore} / 25</span>
          </div>
          <p className="text-xl font-semibold">
            등급: <span className="text-yellow-200">{gradeInfo?.grade || "없음"}</span>
          </p>
          <p className="text-md text-white/90">{gradeInfo?.message}</p>
        </div>

        {/* 피드백 카드 목록 */}
        <div className="grid sm:grid-cols-2 gap-6">
          {scoredFeedback.map((item, idx) => (
            <div
              key={idx}
              className="backdrop-blur-md bg-white/20 border border-white/20 rounded-2xl p-5 text-white shadow-lg hover:scale-[1.02] transition-all"
            >
              <h3 className="text-lg font-bold text-white drop-shadow">{item.question}</h3>
              <p className="mt-2 text-sm text-white/90">{item.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


