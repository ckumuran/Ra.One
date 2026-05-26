using UnityEngine;
using UnityEngine.UI;

public class BossHealthBar : MonoBehaviour
{
    public Slider healthBar;

    public BossAI boss;

    void Update()
    {
        if (boss == null) return;

        healthBar.value =
            (float)boss.GetCurrentHealth() /
            boss.maxHealth;
    }
}
