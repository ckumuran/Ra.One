using UnityEngine;
using TMPro;

public class FPSCounter : MonoBehaviour
{
    public TextMeshProUGUI fpsText;

    void Update()
    {
        int fps =
            (int)(1f / Time.unscaledDeltaTime);

        fpsText.text =
            fps.ToString() + " FPS";
    }
}
