import { useRef, useState } from "react";
import victoryGif from "./assets/victory.gif";
import "./App.css";

function App() {
  const noRef = useRef(null);
  const containerRef = useRef(null);
  const [yesClicked, setYesClicked] = useState(false);
  const [yesScale, setYesScale] = useState(1);

  const handleMouseMove = (e) => {
    const btn = noRef.current;
    const container = containerRef.current;
    if (!btn || !container) return;

    const btnRect = btn.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    const dx = e.clientX - btnCenterX;
    const dy = e.clientY - btnCenterY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    const triggerDistance = 300;

    if (distance < triggerDistance) {
      const speed = 20;

      let newLeft =
        btn.offsetLeft - (dx / distance) * speed;
      let newTop =
        btn.offsetTop - (dy / distance) * speed;

      // limites de la card
      const maxX = container.clientWidth - btn.offsetWidth;
      const maxY = container.clientHeight - btn.offsetHeight;

      // Wrapping logic
      // newLeft = Math.max(0, Math.min(maxX, newLeft));
      // newTop = Math.max(0, Math.min(maxY, newTop));
      if (newLeft < 0) newLeft = maxX;
      else if (newLeft > maxX) newLeft = 0;

      if (newTop < 0) newTop = maxY;
      else if (newTop > maxY) newTop = 0;

      btn.style.left = `${newLeft}px`;
      btn.style.top = `${newTop}px`;
    }
  };

  return (
    <div className="container">
      <div className="card">
        {!yesClicked ? (
          <>
            <h1>Mel', <br/> will you be my Valentine ? <br/> 💖</h1>

            <div
              className="buttons"
              ref={containerRef}
              onMouseMove={handleMouseMove}
            >
              <button className="yes" onClick={() => setYesClicked(true)} onMouseEnter={() => setYesScale(prev => prev * 1.05)} style={{ transform: `scale(${yesScale})` }}>
                Yes
              </button>

              <button className="no" ref={noRef}>
                No
              </button>
            </div>
          </>
        ) : (
          <>
            <h1>Yaaay 🎉💘</h1>
            <img src={victoryGif} alt="Victory" width="250" />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
