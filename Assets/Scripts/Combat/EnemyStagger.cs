using UnityEngine;
using System.Collections;

public class EnemyStagger : MonoBehaviour
{
    public bool isStaggered;

    public float staggerDuration = 0.3f;

    public void Stagger()
    {
        StartCoroutine(DoStagger());
    }

    IEnumerator DoStagger()
    {
        isStaggered = true;

        yield return new WaitForSeconds(staggerDuration);

        isStaggered = false;
    }
}
