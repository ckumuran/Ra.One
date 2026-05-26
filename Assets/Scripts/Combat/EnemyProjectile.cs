using UnityEngine;

public class EnemyProjectile : MonoBehaviour
{
    public float speed = 18f;

    public int damage = 10;

    public float lifeTime = 4f;

    private Vector3 direction;

    public void Initialize(Vector3 dir)
    {
        direction = dir.normalized;

        Destroy(gameObject, lifeTime);
    }

    void Update()
    {
        transform.position +=
            direction *
            speed *
            Time.deltaTime;
    }

    void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            PlayerStats stats =
                other.GetComponent<PlayerStats>();

            if (stats != null)
            {
                stats.TakeDamage(damage);
            }

            if (CameraShake.Instance != null)
            {
                CameraShake.Instance.Shake(0.1f, 0.1f);
            }

            Destroy(gameObject);
        }
    }
}
