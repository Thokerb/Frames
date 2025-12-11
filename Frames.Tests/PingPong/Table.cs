using Frames.Model;

namespace Frames.Tests.PingPong;

public class Table : CoupledModel
{
    public Table() : base("table")
    {

    }

    protected override void Initialize()
    {
        AddModel<Player,PlayerState>("player1", new PlayerState()
        {
            Name = "Waiting"
        });        
        AddModel<Player,PlayerState>("player2", new PlayerState()
        {
            Name = "Send"
        });
        
        
        AddCoupling("player1", Player.Send, "player2", Player.Receive);
        AddCoupling("player2", Player.Send, "player1", Player.Receive);    }
}