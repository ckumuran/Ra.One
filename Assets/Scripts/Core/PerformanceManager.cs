using UnityEngine;

public class PerformanceManager : MonoBehaviour
{
    void Start()
    {
#if UNITY_ANDROID || UNITY_IOS

        Application.targetFrameRate = 60;

        if (SystemInfo.systemMemorySize <= 4000)
        {
            QualitySettings.SetQualityLevel(1);
        }
        else
        {
            QualitySettings.SetQualityLevel(2);
        }

#endif
    }
}
