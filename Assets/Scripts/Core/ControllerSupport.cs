using UnityEngine;

public class ControllerSupport : MonoBehaviour
{
    void Start()
    {
        string[] controllers =
            Input.GetJoystickNames();

        foreach (string controller in controllers)
        {
            Debug.Log("Controller: " + controller);
        }
    }
}
