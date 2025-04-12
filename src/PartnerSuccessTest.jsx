export default function PartnerSuccessTest() {
  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-gradient-to-br from-blue-500 to-purple-500 text-white p-8">
      <div className="flex flex-col items-center mt-20">
        <h1 className="text-5xl font-bold">성사율 진단 테스트</h1>
        <p className="text-xl mt-4">파트너님의 현재 상태를 분석해볼게요</p>
      </div>
      <div className="text-center text-sm text-white/80">
        시작을 누르면 <span className="underline">이용약관</span>에 동의한 것으로 간주됩니다.
      </div>
      <button className="bg-white text-blue-600 font-medium px-6 py-2 rounded-full shadow-md mb-20 hover:bg-gray-100 transition">
        시작하기
      </button>
    </div>
  );
}
