using UnityEngine;

public class ChaseState : BaseState
{
    public ChaseState(EnemyStateMachine machine)
        : base(machine)
    {

    }

    public override void Enter()
    {
        Debug.Log("Enemy Chase");
    }

    public override void Tick()
    {

    }

    public override void Exit()
    {

    }
}
