using UnityEngine;

public class CombatController : MonoBehaviour
{
    public float attackRange = 2f;
    public int damage = 10;

    public LayerMask enemyLayer;

    public Transform attackPoint;

    public Animator animator;

    private bool canAttack = true;

    private readonly int attackHash = Animator.StringToHash("Attack");

    void Update()
    {
        HandleAttack();
    }

    void HandleAttack()
    {
        if (Input.GetMouseButtonDown(0) && canAttack)
        {
            Attack();
        }
    }

    void Attack()
    {
        canAttack = false;

        if (animator != null)
        {
            animator.SetTrigger(attackHash);
        }

        Collider[] hitEnemies = Physics.OverlapSphere(
            attackPoint.position,
            attackRange,
            enemyLayer
        );

        foreach (Collider enemy in hitEnemies)
        {
            EnemyAI ai = enemy.GetComponent<EnemyAI>();

            if (ai != null)
            {
                ai.TakeDamage(damage);

                if (HitStop.Instance != null)
                {
                    HitStop.Instance.Stop(0.08f);
                }
            }
        }

        Invoke(nameof(ResetAttack), 0.4f);
    }

    void ResetAttack()
    {
        canAttack = true;
    }

    void OnDrawGizmosSelected()
    {
        if (attackPoint == null) return;

        Gizmos.color = Color.red;

        Gizmos.DrawWireSphere(
            attackPoint.position,
            attackRange
        );
    }
}
