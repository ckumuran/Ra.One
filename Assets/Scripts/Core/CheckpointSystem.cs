using UnityEngine;

public class CheckpointSystem : MonoBehaviour
{
    public static Vector3 lastCheckpoint;

    public void SaveCheckpoint(Vector3 position)
    {
        lastCheckpoint = position;
    }

    public void RespawnPlayer(GameObject player)
    {
        player.transform.position =
            lastCheckpoint;
    }
}
