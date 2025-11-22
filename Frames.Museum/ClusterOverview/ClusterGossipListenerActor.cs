using Akka.Actor;
using Akka.Cluster;
using Akka.Event;
using Microsoft.AspNetCore.SignalR;

namespace Frames.Museum.ClusterOverview
{
    public class ClusterGossipListenerActor : ReceiveActor
    {
        private readonly ILoggingAdapter _log = Context.GetLogger();
        private readonly Cluster _cluster = Cluster.Get(Context.System);
        private readonly IHubContext<ClusterHub> _hubContext;

        public ClusterGossipListenerActor(IHubContext<ClusterHub> hubContext)
        {
            _hubContext = hubContext;

            ReceiveAsync<ClusterEvent.MemberUp>(async msg => await HandleMemberUp(msg));
            ReceiveAsync<ClusterEvent.UnreachableMember>(async msg => await HandleUnreachable(msg));
            ReceiveAsync<ClusterEvent.ReachableMember>(async msg => await HandleReachable(msg));
            ReceiveAsync<ClusterEvent.MemberRemoved>(async msg => await HandleMemberRemoved(msg));
            ReceiveAsync<ClusterEvent.MemberJoined>(async msg => await HandleMemberJoined(msg));
            ReceiveAsync<ClusterEvent.MemberLeft>(async msg => await HandleMemberLeft(msg));
            ReceiveAsync<ClusterEvent.MemberExited>(async msg => await HandleMemberExited(msg));
            ReceiveAsync<ClusterEvent.LeaderChanged>(async msg => await HandleLeaderChanged(msg));
            ReceiveAsync<ClusterEvent.RoleLeaderChanged>(async msg => await HandleRoleLeaderChanged(msg));
            ReceiveAsync<ClusterEvent.ClusterShuttingDown>(async msg => await HandleClusterShuttingDown(msg));

            // Catch-all for other cluster domain events (optional)
            Receive<ClusterEvent.IMemberEvent>(msg => _log.Debug("Received IMemberEvent: {0}", msg.GetType().Name));
            Receive<ClusterEvent.IReachabilityEvent>(msg => _log.Debug("Received IReachabilityEvent: {0}", msg.GetType().Name));
            Receive<ClusterEvent.IClusterDomainEvent>(msg => _log.Debug("Received IClusterDomainEvent: {0}", msg.GetType().Name));
        }

        protected override void PreStart()
        {
            base.PreStart();
            // Subscribe to a rich set of cluster events. InitialStateAsEvents will emit the current state as events.
            _cluster.Subscribe(Self, ClusterEvent.InitialStateAsEvents,
                new[]
                {
                    typeof(ClusterEvent.IMemberEvent),
                    typeof(ClusterEvent.IReachabilityEvent),
                    typeof(ClusterEvent.IClusterDomainEvent),
                    typeof(ClusterEvent.LeaderChanged),
                    typeof(ClusterEvent.RoleLeaderChanged),
                    typeof(ClusterEvent.ClusterShuttingDown)
                });
            _log.Info("ClusterGossipListenerActor subscribed to cluster events.");
        }

        protected override void PostStop()
        {
            _cluster.Unsubscribe(Self);
            base.PostStop();
            _log.Info("ClusterGossipListenerActor unsubscribed from cluster events.");
        }

        #region Handlers

        private Task HandleMemberUp(ClusterEvent.MemberUp up)
        {
            var dto = MemberToDto(up.Member);
            _log.Info("Member is Up: {0}", up.Member);
            return BroadcastAsync(ClusterEventType.MemberUp, dto);
        }

        private Task HandleUnreachable(ClusterEvent.UnreachableMember unreachable)
        {
            var dto = MemberToDto(unreachable.Member);
            _log.Warning("Member detected as unreachable: {0}", unreachable.Member);
            return BroadcastAsync(ClusterEventType.MemberUnreachable, dto);
        }

        private Task HandleReachable(ClusterEvent.ReachableMember reachable)
        {
            var dto = MemberToDto(reachable.Member);
            _log.Info("Member marked reachable again: {0}", reachable.Member);
            return BroadcastAsync(ClusterEventType.MemberReachable, dto);
        }

        private Task HandleMemberRemoved(ClusterEvent.MemberRemoved removed)
        {
            var dto = MemberToDto(removed.Member);
            _log.Info("Member removed: {0}", removed.Member);
            return BroadcastAsync(ClusterEventType.MemberRemoved, dto);
        }

        private Task HandleMemberJoined(ClusterEvent.MemberJoined joined)
        {
            var dto = MemberToDto(joined.Member);
            _log.Info("Member joined: {0}", joined.Member);
            return BroadcastAsync(ClusterEventType.MemberJoined, dto);
        }

        private Task HandleMemberLeft(ClusterEvent.MemberLeft left)
        {
            var dto = MemberToDto(left.Member);
            _log.Info("Member left: {0}", left.Member);
            return BroadcastAsync(ClusterEventType.MemberLeft, dto);
        }

        private Task HandleMemberExited(ClusterEvent.MemberExited exited)
        {
            var dto = MemberToDto(exited.Member);
            _log.Info("Member exited: {0}", exited.Member);
            return BroadcastAsync(ClusterEventType.MemberExited, dto);
        }

        private Task HandleLeaderChanged(ClusterEvent.LeaderChanged changed)
        {
            var leaderAddress = changed.Leader;
            _log.Info("Leader changed: {0}", leaderAddress);
            return BroadcastAsync(ClusterEventType.LeaderChanged, new ClusterMemberDto{ Address = leaderAddress?.ToString() });
        }

        private Task HandleRoleLeaderChanged(ClusterEvent.RoleLeaderChanged changed)
        {
            var role = changed.Role;
            var leaderAddress = changed.Leader;
            _log.Info("Role leader changed for role '{0}': {1}", role, leaderAddress);
            return BroadcastAsync(ClusterEventType.RoleLeaderChanged, new ClusterMemberDto(){ Address = leaderAddress?.ToString() });
        }

        private Task HandleClusterShuttingDown(ClusterEvent.ClusterShuttingDown _)
        {
            _log.Warning("Cluster is shutting down.");
            return BroadcastAsync(ClusterEventType.ClusterShuttingDown, new ClusterMemberDto{  });
        }

        #endregion

        #region Utilities

        private Task BroadcastAsync(ClusterEventType eventType, ClusterMemberDto payload)
        {
            // All clients get the event. In a real app you might target specific groups/roles.
            try
            {
                var eventName = eventType.ToString();
                return _hubContext.Clients.All.SendAsync(eventName, payload);
            }
            catch (Exception ex)
            {
                _log.Error(ex, "Failed to broadcast cluster event {0}", eventType);
                return Task.CompletedTask;
            }
        }

        private ClusterMemberDto MemberToDto(Member member)
        {
            if (member == null) return null;

            return new ClusterMemberDto
            {
                Address = member.Address.ToString(),
                UniqueAddress = member.UniqueAddress?.ToString(),
                Status = member.Status.ToString(),
                Roles = member.Roles?.ToArray(),
                ToStringValue = member.ToString()
            };
        }

        #endregion
    }
    
    public enum ClusterEventType
    {
        MemberUp,
        MemberUnreachable,
        MemberReachable,
        MemberRemoved,
        MemberJoined,
        MemberLeft,
        MemberExited,
        LeaderChanged,
        RoleLeaderChanged,
        ClusterShuttingDown
    }
    
    public class ClusterMemberDto
    {
        public string? Address { get; set; }
        public string? UniqueAddress { get; set; }
        public string Status { get; set; }
        public string[]? Roles { get; set; }
        public string ToStringValue { get; set; }
    }
}
