using UnityEngine;
using UnityEngine.UI;

public class LoadingScreen : MonoBehaviour
{
    public Slider loadingBar;

    public void SetProgress(float progress)
    {
        loadingBar.value = progress;
    }
}
