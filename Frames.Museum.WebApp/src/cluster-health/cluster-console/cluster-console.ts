import { Component, Input, inject } from '@angular/core';
import { ClusterEventsService, ClusterEvent, ClusterEventType } from '../../app/services/cluster-events.service';
import { computed } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cluster-console',
  imports: [DatePipe],
  templateUrl: './cluster-console.html',
  styleUrl: './cluster-console.css'
})
export class ClusterConsole {
  @Input() endpointUrl!: string;
  
  private readonly clusterEventsService = inject(ClusterEventsService);
  
  readonly events = computed(() => {
    return this.clusterEventsService.getEventsForEndpoint(this.endpointUrl);
  });

  readonly eventTypeColors = {
    [ClusterEventType.MemberUp]: 'text-green-600',
    [ClusterEventType.MemberUnreachable]: 'text-red-600',
    [ClusterEventType.MemberReachable]: 'text-green-600',
    [ClusterEventType.MemberRemoved]: 'text-red-600',
    [ClusterEventType.MemberJoined]: 'text-blue-600',
    [ClusterEventType.MemberLeft]: 'text-yellow-600',
    [ClusterEventType.MemberExited]: 'text-red-600',
    [ClusterEventType.LeaderChanged]: 'text-purple-600',
    [ClusterEventType.RoleLeaderChanged]: 'text-purple-600',
    [ClusterEventType.ClusterShuttingDown]: 'text-red-600'
  };

  getEventColor(eventType: ClusterEventType): string {
    return this.eventTypeColors[eventType] || 'text-gray-600';
  }

  clearEvents(): void {
    this.clusterEventsService.clearEventsForEndpoint(this.endpointUrl);
  }

  getEventIcon(eventType: ClusterEventType): string {
    switch (eventType) {
      case ClusterEventType.MemberUp:
        return '🟢';
      case ClusterEventType.MemberUnreachable:
        return '🔴';
      case ClusterEventType.MemberReachable:
        return '🟢';
      case ClusterEventType.MemberRemoved:
        return '❌';
      case ClusterEventType.MemberJoined:
        return '➕';
      case ClusterEventType.MemberLeft:
        return '➖';
      case ClusterEventType.MemberExited:
        return '🚪';
      case ClusterEventType.LeaderChanged:
        return '👑';
      case ClusterEventType.RoleLeaderChanged:
        return '👑';
      case ClusterEventType.ClusterShuttingDown:
        return '🛑';
      default:
        return '📋';
    }
  }
} 