import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    id: "Q1",
    title: "견적 넣는 속도",
    options: [
      { label: "1시간 이내에 견적을 보내는 편이에요", score: 5 },
      { label: "보통 몇 시간 내에, 늦어도 당일에는 보내요", score: 3 },
      { label: "하루 이상 지나서 넣는 경우도 있어요", score: 1 },
    ]
  },
  {
    id: "Q2",
    title: "견적 문자 내용",
    options: [
      { label: "추가금, 청소범위, 무료서비스 등을 포함한 상세 안내를 드려요", score: 5 },
      { label: "간단한 인사와 안내 위주로 보내요", score: 3 },
      { label: "“견적 보냈습니다” 정도의 짧은 메시지만 보내요", score: 1 },
    ]
  },
  {
    id: "Q3",
    title: "프로필의 섬세함",
    options: [
      { label: "사진, 청소범위, 무료서비스, 추가금, 리뷰이벤트, 전화번호 등 모든 핵심 정보가 정리돼 있어요", score: 5 },
      { label: "필수 정보는 있지만, 일부 항목은 빠져 있거나 정리가 덜 돼 있어요", score: 3 },
      { label: "기본 내용만 적혀 있거나 미작성 상태예요", score: 1 },
    ]
  },
  {
    id: "Q4",
    title: "리뷰 보유 여부",
    options: [
      { label: "리뷰이벤트 또는 외부 플랫폼 리뷰 이관 등으로 다수의 리뷰를 보유하고 있어요", score: 5 },
      { label: "이벤트를 통해 소수의 리뷰를 받았거나, 리뷰 수가 많진 않아요", score: 3 },
      { label: "리뷰가 거의 없어요", score: 1 },
    ]
  },
  {
    id: "Q5",
    title: "연락 빈도 및 정성",
    options: [
      { label: "견적 후 바로 전화를 하거나, 문자에 상세 안내를 덧붙여서 보내요", score: 5 },
      { label: "문자/채팅으로 간단한 인사 정도만 보내요", score: 3 },
      { label: "별도로 연락하지 않거나, 템플릿처럼 형식적인 메시지를 보내요", score: 1 },
    ]
  },
];

const feedbackTemplate = {
  Q1: {
    5: "빠른 견적 응답은 성사 확률을 높이는 핵심 요인입니다.",
    3: "적당한 속도지만, 좀 더 빠른 응답이 경쟁력을 높여줍니다.",
    1: "견적 응답이 늦어지면 고객 이탈 가능성이 커집니다.",
  },
  Q2: {
    5: "견적 메시지가 매우 상세하여 고객 신뢰를 얻기에 좋습니다.",
    3: "기본 정보는 있으나, 조금 더 구체적인 안내가 필요해 보입니다.",
    1: "간단한 메시지는 고객에게 불친절하게 보일 수 있어요.",
  },
  Q3: {
    5: "프로필이 매우 체계적이며 고객 신뢰에 큰 도움이 됩니다.",
    3: "중요 정보는 있으나, 구성이나 표현이 다소 부족해 보입니다.",
    1: "프로필이 미작성이거나 핵심 정보가 부족합니다.",
  },
  Q4: {
    5: "리뷰가 많아 고객이 안심하고 선택할 수 있는 강점이 있어요.",
    3: "리뷰 수는 적지만 긍정적인 인상은 줄 수 있습니다.",
    1: "리뷰가 없다면 신뢰 형성이 어렵습니다.",
  },
  Q5: {
    5: "견적 후 연락까지 주면 고객 입장에서 매우 신뢰가 갑니다.",
    3: "기본적인 연락은 하지만 조금 더 적극적인 접근이 좋습니다.",
    1: "연락이 없으면 고객은 다른 파트너에게로 이동할 확률이 큽니다.",
  }
};

const summaryFeedback = [
  {
    grade: "A등급 🥇",
    minScore: 22,
    maxScore: 25,
    message: "탁월한 성사 가능성을 지닌 파트너입니다. 현재 전략을 그대로 유지해보세요!",
  },
  {
    grade: "B등급 🥈",
    minScore: 17,
    maxScore: 21,
    message: "기본은 잘 되어 있어요. 한두 가지 요소만 개선해도 성사율이 크게 올라갈 수 있어요.",
  },
  {
    grade: "C등급 🥉",
    minScore: 13,
    maxScore: 16,
    message: "몇 가지 중요한 요소에서 약점이 보입니다. 피드백을 참고해서 개선해보세요.",
  },
  {
    grade: "D등급 ⚠️",
    minScore: 0,
    maxScore: 12,
    message: "성사율 개선이 시급해 보입니다. 각 항목의 피드백을 바탕으로 전략을 바꿔보세요.",
  },
];

function PartnerSuccessTest() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (score) => {
    const newAnswers = [...answers, { questionId: questions[current].id, score }];
    setAnswers(newAnswers);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const handleNavigateResult = () => {
    navigate("/result", { state: { answers } });
  };

  const renderIntro = () => (
    <motion.div
      key="intro"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7 }}
      className="text-center space-y-6 max-w-lg"
    >
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight drop-shadow-md">성사율 진단 테스트</h1>
      <p className="text-lg sm:text-xl leading-relaxed">간단한 테스트로 <span className="underline underline-offset-4">성사 가능성</span>을 예측해보세요.</p>
      <button
        onClick={() => setStarted(true)}
        className="mt-4 px-8 py-3 bg-white text-blue-600 text-lg rounded-full font-semibold shadow-md hover:scale-105 hover:shadow-blue-300 transition-all duration-300"
      >
        시작하기
      </button>
    </motion.div>
  );

  const renderQuestion = () => (
    <motion.div
      key={`question-${current}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-lg p-6 text-gray-800 w-full max-w-2xl space-y-6"
    >
      <h2 className="text-2xl font-bold text-blue-600 text-center">{questions[current].title}</h2>
      <ul className="space-y-4">
        {questions[current].options.map((option, idx) => (
          <li key={idx}>
            <button
              onClick={() => handleSelect(option.score)}
              className="w-full px-6 py-3 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg text-left shadow-sm transition"
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
      <p className="text-sm text-center text-gray-400">{current + 1} / {questions.length}</p>
    </motion.div>
  );

  const renderComplete = () => (
    <motion.div
      key="complete"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7 }}
      className="bg-white rounded-2xl shadow-lg p-6 text-gray-800 w-full max-w-xl space-y-4 text-center"
    >
      <h2 className="text-3xl font-bold text-blue-600">응답 완료!</h2>
      <p>결과 분석을 위해 결과 페이지로 이동합니다.</p>
      <button
        onClick={handleNavigateResult}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
      >
        결과 보기
      </button>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-400 to-blue-600 text-white px-4">
      <AnimatePresence mode="wait">
        {!started ? renderIntro() : finished ? renderComplete() : renderQuestion()}
      </AnimatePresence>
    </div>
  );
}

export default PartnerSuccessTest;
export { feedbackTemplate, summaryFeedback, questions };
