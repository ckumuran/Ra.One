using UnityEngine;

public class ShopMenu : MonoBehaviour
{
    public CurrencySystem currency;

    public SkillTree skillTree;

    public void BuyHeavyAttack()
    {
        if (currency.SpendCredits(100))
        {
            skillTree.UnlockHeavyAttack();
        }
    }

    public void BuyDoubleDash()
    {
        if (currency.SpendCredits(200))
        {
            skillTree.UnlockDoubleDash();
        }
    }
}
