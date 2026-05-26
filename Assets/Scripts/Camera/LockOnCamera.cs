using UnityEngine;

public class LockOnCamera : MonoBehaviour
{
    public Transform player;

    public Transform currentTarget;

    public float followSpeed = 8f;

    public Vector3 offset =
        new Vector3(0, 4, -6);

    void LateUpdate()
    {
        if (player == null) return;

        if (currentTarget == null)
        {
            return;
        }

        Vector3 midpoint =
            Vector3.Lerp(
                player.position,
                currentTarget.position,
                0.5f
            );

        Vector3 desiredPosition =
            midpoint +
            player.transform.TransformDirection(offset);

        transform.position =
            Vector3.Lerp(
                transform.position,
                desiredPosition,
                followSpeed * Time.deltaTime
            );

        transform.LookAt(midpoint + Vector3.up * 1.5f);
    }
}
