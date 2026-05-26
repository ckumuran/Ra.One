using UnityEngine;

public class CurrencySystem : MonoBehaviour
{
    public int credits;

    public void AddCredits(int amount)
    {
        credits += amount;
    }

    public bool SpendCredits(int amount)
    {
        if (credits >= amount)
        {
            credits -= amount;

            return true;
        }

        return false;
    }
}
