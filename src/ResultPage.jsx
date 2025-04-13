// import { useLocation } from "react-router-dom";
// import { questions, feedbackTemplate, summaryFeedback } from "./PartnerSuccessTest";

// export default function ResultPage() {
//   const location = useLocation();
//   const answers = location.state?.answers || [];

//   const totalScore = answers.reduce((sum, ans) => sum + ans.score, 0);

//   const gradeInfo = summaryFeedback.find(
//     (item) => totalScore >= item.minScore && totalScore <= item.maxScore
//   );

//   const scoredFeedback = answers
//     .map((ans) => {
//       const feedback = feedbackTemplate[ans.questionId]?.[ans.score];
//       const question = questions.find((q) => q.id === ans.questionId)?.title || "";
//       return { questionId: ans.questionId, score: ans.score, feedback, question };
//     })
//     .sort((a, b) => a.score - b.score); // 낮은 점수 먼저 정렬

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 text-gray-800 p-8">
//       <div className="max-w-3xl mx-auto space-y-8">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-blue-700">성사율 진단 결과</h1>
//           <p className="text-lg mt-2">
//             총점: <span className="font-bold text-blue-600">{totalScore}</span> / 25점
//           </p>
//           <p className="mt-1 text-xl font-semibold text-blue-800">
//             {gradeInfo?.grade || "등급 없음"}
//           </p>
//           <p className="mt-1 text-gray-600">{gradeInfo?.message}</p>
//         </div>

//         <div className="space-y-6">
//           {scoredFeedback.map((item, idx) => (
//             <div key={idx} className="bg-white shadow-md rounded-xl p-4">
//               <h3 className="font-semibold text-blue-600">{item.question}</h3>
//               <p className="mt-1 text-gray-700">{item.feedback}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


import { useLocation } from "react-router-dom";
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


