using UnityEngine;

public class AnimatedMainMenu : MonoBehaviour
{
    public RectTransform title;

    public float floatSpeed = 2f;

    public float floatAmount = 10f;

    private Vector3 startPos;

    void Start()
    {
        startPos = title.localPosition;
    }

    void Update()
    {
        float offset =
            Mathf.Sin(Time.time * floatSpeed)
            * floatAmount;

        title.localPosition =
            startPos +
            Vector3.up * offset;
    }
}
