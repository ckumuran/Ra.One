using UnityEngine;

public class IdleState : BaseState
{
    public IdleState(EnemyStateMachine machine)
        : base(machine)
    {

    }

    public override void Enter()
    {
        Debug.Log("Enemy Idle");
    }

    public override void Tick()
    {

    }

    public override void Exit()
    {

    }
}
