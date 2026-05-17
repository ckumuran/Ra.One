import { useEffect } from "react";

export default function HitStop({
  active
}) {

  useEffect(() => {

    if (!active) return;

    const originalTimeScale =
      document.timeline?.playbackRate || 1;

    document.timeline.playbackRate = 0.2;

    setTimeout(() => {

      document.timeline.playbackRate =
        originalTimeScale;

    }, 80);

  }, [active]);

  return null;
}
