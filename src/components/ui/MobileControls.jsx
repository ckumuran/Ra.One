import { useEffect } from "react";

import keys from "../../game/controls";

export default function MobileControls() {

  useEffect(() => {

    const preventZoom = (e) => {
      e.preventDefault();
    };

    document.addEventListener(
      "touchmove",
      preventZoom,
      { passive: false }
    );

    return () => {
      document.removeEventListener(
        "touchmove",
        preventZoom
      );
    };

  }, []);

  const startKey = (key) => {
    keys[key] = true;
  };

  const stopKey = (key) => {
    keys[key] = false;
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 40,
          bottom: 40,
          width: 160,
          height: 160,
          borderRadius: "50%",
          border: "3px solid #00ffff55",
          background: "#00ffff11",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          touchAction: "none"
        }}
      >

        <div
          onTouchStart={() => startKey("w")}
          onTouchEnd={() => stopKey("w")}

          style={{
            position: "absolute",
            top: 10,
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: "#00ffff88"
          }}
        />

        <div
          onTouchStart={() => startKey("s")}
          onTouchEnd={() => stopKey("s")}

          style={{
            position: "absolute",
            bottom: 10,
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: "#00ffff88"
          }}
        />

        <div
          onTouchStart={() => startKey("a")}
          onTouchEnd={() => stopKey("a")}

          style={{
            position: "absolute",
            left: 10,
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: "#00ffff88"
          }}
        />

        <div
          onTouchStart={() => startKey("d")}
          onTouchEnd={() => stopKey("d")}

          style={{
            position: "absolute",
            right: 10,
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: "#00ffff88"
          }}
        />

      </div>

      <div
        style={{
          position: "absolute",
          right: 40,
          bottom: 40,
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
          width: 220,
          justifyContent: "flex-end"
        }}
      >

        <button
          onTouchStart={() => startKey("f")}
          onTouchEnd={() => stopKey("f")}

          style={buttonStyle("#ff6600")}
        >

          ATTACK

        </button>

        <button
          onTouchStart={() => startKey("g")}
          onTouchEnd={() => stopKey("g")}

          style={buttonStyle("#00ffff")}
        >

          BLAST

        </button>

        <button
          onTouchStart={() => startKey("q")}
          onTouchEnd={() => stopKey("q")}

          style={buttonStyle("#ff00ff")}
        >

          DASH

        </button>

        <button
          onTouchStart={() => startKey(" ")}
          onTouchEnd={() => stopKey(" ")}

          style={buttonStyle("#00ff99")}
        >

          JUMP

        </button>

      </div>
    </>
  );
}

function buttonStyle(color) {

  return {
    width: 90,
    height: 90,
    borderRadius: "50%",
    border: `3px solid ${color}`,
    background: `${color}22`,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    touchAction: "none"
  };

}
