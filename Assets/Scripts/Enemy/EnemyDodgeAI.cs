using UnityEngine;
using System.Collections;

public class EnemyDodgeAI : MonoBehaviour
{
    public float dodgeDistance = 3f;

    public float dodgeCooldown = 2f;

    private bool canDodge = true;

    public void TryDodge()
    {
        if (canDodge)
        {
            StartCoroutine(DodgeRoutine());
        }
    }

    IEnumerator DodgeRoutine()
    {
        canDodge = false;

        Vector3 dodgeDir =
            -transform.right *
            dodgeDistance;

        transform.position += dodgeDir;

        yield return new WaitForSeconds(dodgeCooldown);

        canDodge = true;
    }
}
