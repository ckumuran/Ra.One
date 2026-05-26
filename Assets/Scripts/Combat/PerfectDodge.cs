using UnityEngine;

public class PerfectDodge : MonoBehaviour
{
    public float perfectWindow = 0.2f;

    private float dodgeTimer;

    public bool perfectDodged;

    void Update()
    {
        dodgeTimer -= Time.deltaTime;

        perfectDodged = dodgeTimer > 0;
    }

    public void TriggerPerfectWindow()
    {
        dodgeTimer = perfectWindow;
    }
}
