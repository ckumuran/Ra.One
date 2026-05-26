using UnityEngine;

public class WaveManager : MonoBehaviour
{
    public GameObject enemyPrefab;

    public Transform[] spawnPoints;

    public int enemiesPerWave = 3;

    private int currentWave = 1;

    void Start()
    {
        SpawnWave();
    }

    void SpawnWave()
    {
        for (int i = 0; i < enemiesPerWave; i++)
        {
            int randomSpawn =
                Random.Range(0, spawnPoints.Length);

            Instantiate(
                enemyPrefab,
                spawnPoints[randomSpawn].position,
                Quaternion.identity
            );
        }
    }

    public void NextWave()
    {
        currentWave++;

        enemiesPerWave += 2;

        SpawnWave();
    }
}
