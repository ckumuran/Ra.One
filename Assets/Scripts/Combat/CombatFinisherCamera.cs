using UnityEngine;
using System.Collections;

public class CombatFinisherCamera : MonoBehaviour
{
    public Camera mainCamera;

    public Transform player;

    public Transform enemy;

    public Vector3 offset =
        new Vector3(2, 2, -3);

    public float duration = 1.2f;

    public void PlayFinisherCamera()
    {
        StartCoroutine(FinisherSequence());
    }

    IEnumerator FinisherSequence()
    {
        Vector3 originalPos =
            mainCamera.transform.position;

        Quaternion originalRot =
            mainCamera.transform.rotation;

        Vector3 midpoint =
            Vector3.Lerp(
                player.position,
                enemy.position,
                0.5f
            );

        Vector3 targetPosition =
            midpoint + offset;

        float timer = 0f;

        while (timer < duration)
        {
            timer += Time.deltaTime;

            mainCamera.transform.position =
                Vector3.Lerp(
                    mainCamera.transform.position,
                    targetPosition,
                    8f * Time.deltaTime
                );

            mainCamera.transform.LookAt(midpoint);

            yield return null;
        }

        mainCamera.transform.position = originalPos;

        mainCamera.transform.rotation = originalRot;
    }
}
