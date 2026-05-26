using UnityEngine;
using System.Collections;

public class CameraShake : MonoBehaviour
{
    public static CameraShake Instance;

    Vector3 originalPosition;

    void Awake()
    {
        Instance = this;
    }

    void Start()
    {
        originalPosition = transform.localPosition;
    }

    public void Shake(float duration, float magnitude)
    {
        StartCoroutine(DoShake(duration, magnitude));
    }

    IEnumerator DoShake(float duration, float magnitude)
    {
        float elapsed = 0f;

        while (elapsed < duration)
        {
            float x = Random.Range(-1f, 1f) * magnitude;
            float y = Random.Range(-1f, 1f) * magnitude;

            transform.localPosition =
                originalPosition + new Vector3(x, y, 0f);

            elapsed += Time.unscaledDeltaTime;

            yield return null;
        }

        transform.localPosition = originalPosition;
    }
}
