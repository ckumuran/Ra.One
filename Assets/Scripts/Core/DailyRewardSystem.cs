using UnityEngine;
using System;

public class DailyRewardSystem : MonoBehaviour
{
    public int rewardCredits = 100;

    public CurrencySystem currency;

    public void ClaimReward()
    {
        string lastClaim =
            PlayerPrefs.GetString(
                "LastClaim",
                ""
            );

        string today =
            DateTime.Now.Date.ToString();

        if (lastClaim != today)
        {
            currency.AddCredits(rewardCredits);

            PlayerPrefs.SetString(
                "LastClaim",
                today
            );
        }
    }
}
