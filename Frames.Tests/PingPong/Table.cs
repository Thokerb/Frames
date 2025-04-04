using Frames.Model;

namespace Frames.Tests.PingPong;

public class Table : CoupledModel
{
    public Table()
    {
        Player player1 = AddAtomicModel<Player, PlayerSate>();
        Player player2 = AddAtomicModel<Player, PlayerSate>();
        
        
        AddCoupling(player1, Player.Send, player2, Player.Receive);
        AddCoupling(player2, Player.Send, player1, Player.Receive);
    }
}