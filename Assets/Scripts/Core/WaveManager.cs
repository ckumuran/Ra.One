using UnityEngine;

public class WaveManager : MonoBehaviour
{
    public GameObject enemyPrefab;

    public GameObject rangedEnemyPrefab;

    public GameObject bossPrefab;

    public Transform[] spawnPoints;

    public WaveAnnouncement announcement;

    public int enemiesPerWave = 3;

    private int currentWave = 1;

    void Start()
    {
        SpawnWave();
    }

    void SpawnWave()
    {
        if (announcement != null)
        {
            announcement.ShowWave(currentWave);
        }

        if (currentWave == 4)
        {
            SpawnBoss();

            return;
        }

        for (int i = 0; i < enemiesPerWave; i++)
        {
            int randomSpawn =
                Random.Range(
                    0,
                    spawnPoints.Length
                );

            GameObject prefabToSpawn =
                currentWave >= 2
                ? rangedEnemyPrefab
                : enemyPrefab;

            Instantiate(
                prefabToSpawn,
                spawnPoints[randomSpawn].position,
                Quaternion.identity
            );
        }
    }

    void SpawnBoss()
    {
        Instantiate(
            bossPrefab,
            spawnPoints[0].position,
            Quaternion.identity
        );
    }

    public void NextWave()
    {
        currentWave++;

        enemiesPerWave += 2;

        SpawnWave();
    }
}
