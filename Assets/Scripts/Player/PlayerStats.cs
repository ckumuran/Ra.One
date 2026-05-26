using UnityEngine;

public class PlayerStats : MonoBehaviour
{
    public float maxHealth = 1000f;
    public float maxEnergy = 100f;

    public float currentHealth;
    public float currentEnergy;

    void Start()
    {
        currentHealth = maxHealth;
        currentEnergy = maxEnergy;
    }

    public void TakeDamage(float damage)
    {
        currentHealth -= damage;

        if (currentHealth <= 0)
        {
            currentHealth = 0;
        }
    }

    public void UseEnergy(float amount)
    {
        currentEnergy -= amount;

        currentEnergy =
            Mathf.Clamp(
                currentEnergy,
                0,
                maxEnergy
            );
    }
}
