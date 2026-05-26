using UnityEngine;

public class AdvancedComboSystem : MonoBehaviour
{
    [Header("Combo")]
    public int currentCombo;

    public float comboResetTime = 1.2f;

    [Header("Animator")]
    public Animator animator;

    private float comboTimer;

    private bool canQueue;

    private bool queuedInput;

    void Update()
    {
        HandleInput();

        HandleComboTimer();
    }

    void HandleInput()
    {
        if (Input.GetMouseButtonDown(0))
        {
            if (canQueue)
            {
                queuedInput = true;
            }
            else
            {
                StartCombo();
            }
        }
    }

    void StartCombo()
    {
        currentCombo = 1;

        comboTimer = comboResetTime;

        animator.SetInteger("ComboStep", currentCombo);
    }

    public void OpenComboWindow()
    {
        canQueue = true;
    }

    public void CloseComboWindow()
    {
        canQueue = false;

        if (queuedInput)
        {
            queuedInput = false;

            ContinueCombo();
        }
    }

    void ContinueCombo()
    {
        currentCombo++;

        if (currentCombo > 4)
        {
            currentCombo = 1;
        }

        comboTimer = comboResetTime;

        animator.SetInteger("ComboStep", currentCombo);
    }

    void HandleComboTimer()
    {
        comboTimer -= Time.deltaTime;

        if (comboTimer <= 0)
        {
            ResetCombo();
        }
    }

    void ResetCombo()
    {
        currentCombo = 0;

        queuedInput = false;

        canQueue = false;

        animator.SetInteger("ComboStep", 0);
    }
}
