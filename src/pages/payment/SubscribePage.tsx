import {useNavigate} from "react-router-dom";
import {useState} from "react";

export default function SubscribePage() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("MONTHLY_990");

  const handleSubscribe = () => {
    navigate("/checkout", {
      state: {
        planType: selectedPlan,
        price: 990,
      },
    });
  };

  return (
    <div className="wrapper">
      <div className="box_section">
        <h2 style={{marginBottom: "20px"}}>구독하기</h2>
        <p style={{marginBottom: "20px", color: "#666"}}>구독 상품을 선택해주세요!</p>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "16px",
            border: "1px solid #ddd",
            borderRadius: "12px",
            marginBottom: "20px",
            cursor: "pointer",
          }}
        >
          <input
            type="radio"
            name="plan"
            value="MONTHLY_990"
            checked={selectedPlan === "MONTHLY_990"}
            onChange={(e) => setSelectedPlan(e.target.value)}
          />
          <span>월 990원</span>
        </label>

        <button className="button" onClick={handleSubscribe}>
          구독하기
        </button>
      </div>
    </div>
  );
}
