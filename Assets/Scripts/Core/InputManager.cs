using UnityEngine;

public class InputManager : MonoBehaviour
{
    public static InputManager Instance;

    void Awake()
    {
        Instance = this;
    }

    public Vector2 GetMovementInput()
    {
        return new Vector2(
            Input.GetAxisRaw("Horizontal"),
            Input.GetAxisRaw("Vertical")
        );
    }

    public bool AttackPressed()
    {
        return Input.GetMouseButtonDown(0);
    }

    public bool DashPressed()
    {
        return Input.GetKeyDown(KeyCode.LeftShift);
    }

    public bool BlastPressed()
    {
        return Input.GetKeyDown(KeyCode.R);
    }
}
