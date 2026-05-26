using UnityEngine;

public class MemoryCleanup : MonoBehaviour
{
    void Start()
    {
        Resources.UnloadUnusedAssets();

        System.GC.Collect();
    }
}
