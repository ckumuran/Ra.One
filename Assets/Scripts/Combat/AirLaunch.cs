using UnityEngine;

public class AirLaunch : MonoBehaviour
{
    public float launchForce = 10f;

    public LayerMask enemyLayer;

    public Transform launchPoint;

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.R))
        {
            LaunchEnemies();
        }
    }

    void LaunchEnemies()
    {
        Collider[] enemies =
            Physics.OverlapSphere(
                launchPoint.position,
                3f,
                enemyLayer
            );

        foreach (Collider enemy in enemies)
        {
            Rigidbody rb =
                enemy.GetComponent<Rigidbody>();

            if (rb != null)
            {
                rb.linearVelocity =
                    Vector3.up * launchForce;
            }
        }
    }
}
