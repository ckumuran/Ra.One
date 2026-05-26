using UnityEngine;

public class MobileControls : MonoBehaviour
{
    public static bool AttackPressed;
    public static bool DashPressed;
    public static bool BlastPressed;

    public void AttackButton()
    {
        AttackPressed = true;
    }

    public void DashButton()
    {
        DashPressed = true;
    }

    public void BlastButton()
    {
        BlastPressed = true;
    }

    void LateUpdate()
    {
        AttackPressed = false;
        DashPressed = false;
        BlastPressed = false;
    }
}
