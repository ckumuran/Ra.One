using UnityEngine;

public class AdaptiveQuality : MonoBehaviour
{
    public int lowFPS = 25;

    private float timer;

    void Update()
    {
        timer += Time.deltaTime;

        if (timer >= 2f)
        {
            int fps =
                (int)(1f / Time.unscaledDeltaTime);

            if (fps < lowFPS)
            {
                LowerQuality();
            }

            timer = 0f;
        }
    }

    void LowerQuality()
    {
        int current =
            QualitySettings.GetQualityLevel();

        if (current > 0)
        {
            QualitySettings.SetQualityLevel(current - 1);
        }
    }
}
