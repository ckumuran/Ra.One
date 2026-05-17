export default function GameOver({
  wave,
  onRestart
}) {

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#000000ee",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        zIndex: 300
      }}
    >

      <div
        style={{
          fontSize: 72,
          color: "#ff0033"
        }}
      >

        GAME OVER

      </div>

      <div
        style={{
          marginTop: 20,
          fontSize: 28
        }}
      >

        Reached Wave {wave}

      </div>

      <button
        onClick={onRestart}

        style={{
          marginTop: 50,
          padding: "18px 60px",
          fontSize: 24,
          border: "3px solid #ff0033",
          background: "#ff003322",
          color: "white",
          borderRadius: 10
        }}
      >

        RESTART

      </button>

    </div>
  );
}
