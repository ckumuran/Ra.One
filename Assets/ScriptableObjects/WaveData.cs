using UnityEngine;

[CreateAssetMenu(
    fileName = "WaveData",
    menuName = "Game Data/Wave Data"
)]
public class WaveData : ScriptableObject
{
    public int waveNumber;

    public int enemyCount;

    public bool bossWave;
}
