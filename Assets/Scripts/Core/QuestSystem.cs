using UnityEngine;

public class QuestSystem : MonoBehaviour
{
    public int enemiesRequired = 10;

    public int enemiesKilled;

    public bool completed;

    public void AddKill()
    {
        enemiesKilled++;

        if (enemiesKilled >= enemiesRequired)
        {
            CompleteQuest();
        }
    }

    void CompleteQuest()
    {
        completed = true;

        Debug.Log("QUEST COMPLETE");
    }
}
