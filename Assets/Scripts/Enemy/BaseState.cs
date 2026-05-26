public abstract class BaseState
{
    protected EnemyStateMachine stateMachine;

    public BaseState(EnemyStateMachine machine)
    {
        stateMachine = machine;
    }

    public abstract void Enter();

    public abstract void Tick();

    public abstract void Exit();
}
