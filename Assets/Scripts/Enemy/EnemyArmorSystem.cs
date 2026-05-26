using UnityEngine;

public class EnemyArmorSystem : MonoBehaviour
{
    public int armorHealth = 50;

    public bool armorBroken;

    public void DamageArmor(int amount)
    {
        if (armorBroken) return;

        armorHealth -= amount;

        if (armorHealth <= 0)
        {
            BreakArmor();
        }
    }

    void BreakArmor()
    {
        armorBroken = true;

        Debug.Log("ARMOR BROKEN");
    }
}
