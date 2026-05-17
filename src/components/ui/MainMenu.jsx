export default function MainMenu({
  onStart
}) {

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(to bottom, #020208, #050510)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily: "Arial",
        zIndex: 100
      }}
    >

      <div
        style={{
          fontSize: 90,
          fontWeight: "bold",
          color: "#00ffff",
          textShadow:
            "0 0 30px #00ffff"
        }}
      >

        RA.ONE

      </div>

      <div
        style={{
          marginTop: 10,
          fontSize: 24,
          opacity: 0.8
        }}
      >

        Cyber Combat Arena

      </div>

      <button
        onClick={onStart}

        style={{
          marginTop: 60,
          padding: "20px 60px",
          fontSize: 28,
          border: "3px solid #00ffff",
          background: "#00ffff22",
          color: "white",
          cursor: "pointer",
          borderRadius: 10,
          boxShadow:
            "0 0 20px #00ffff"
        }}
      >

        START GAME

      </button>

    </div>
  );
}
