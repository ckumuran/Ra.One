using UnityEngine;
using System.Collections;

public class BossIntro : MonoBehaviour
{
    public CameraShake cameraShake;

    public FinisherFlash flash;

    public GameObject bossObject;

    void Start()
    {
        StartCoroutine(IntroSequence());
    }

    IEnumerator IntroSequence()
    {
        bossObject.SetActive(false);

        yield return new WaitForSeconds(1f);

        if (flash != null)
        {
            flash.Flash();
        }

        if (cameraShake != null)
        {
            cameraShake.Shake(1f, 0.4f);
        }

        yield return new WaitForSeconds(0.5f);

        bossObject.SetActive(true);
    }
}
