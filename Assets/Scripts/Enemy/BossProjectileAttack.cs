using UnityEngine;

public class BossProjectileAttack : MonoBehaviour
{
    public GameObject projectilePrefab;

    public Transform firePoint;

    public float fireRate = 1f;

    private float timer;

    private Transform player;

    void Start()
    {
        GameObject p =
            GameObject.FindGameObjectWithTag("Player");

        if (p != null)
        {
            player = p.transform;
        }
    }

    void Update()
    {
        if (player == null) return;

        timer -= Time.deltaTime;

        if (timer <= 0)
        {
            Fire();

            timer = fireRate;
        }
    }

    void Fire()
    {
        GameObject proj =
            Instantiate(
                projectilePrefab,
                firePoint.position,
                Quaternion.identity
            );

        EnemyProjectile projectile =
            proj.GetComponent<EnemyProjectile>();

        Vector3 dir =
            (player.position - firePoint.position)
            .normalized;

        projectile.Initialize(dir);
    }
}
