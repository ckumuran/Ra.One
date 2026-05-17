export default function PauseMenu({
  onResume
}) {

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#000000cc",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        zIndex: 200
      }}
    >

      <div
        style={{
          fontSize: 64,
          marginBottom: 40
        }}
      >

        PAUSED

      </div>

      <button
        onClick={onResume}

        style={{
          padding: "16px 50px",
          fontSize: 24,
          border: "3px solid #00ffff",
          background: "#00ffff22",
          color: "white",
          borderRadius: 10
        }}
      >

        RESUME

      </button>

    </div>
  );
}
