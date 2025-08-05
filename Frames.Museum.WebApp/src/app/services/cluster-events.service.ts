import { Injectable, signal } from '@angular/core';

export interface ClusterMemberDto {
  address?: string;
  uniqueAddress?: string;
  status?: string;
  roles?: string[];
  toStringValue?: string;
}

export interface ClusterEvent {
  type: ClusterEventType;
  timestamp: Date;
  member: ClusterMemberDto;
  endpointUrl: string;
}

export enum ClusterEventType {
  MemberUp = 'MemberUp',
  MemberUnreachable = 'MemberUnreachable',
  MemberReachable = 'MemberReachable',
  MemberRemoved = 'MemberRemoved',
  MemberJoined = 'MemberJoined',
  MemberLeft = 'MemberLeft',
  MemberExited = 'MemberExited',
  LeaderChanged = 'LeaderChanged',
  RoleLeaderChanged = 'RoleLeaderChanged',
  ClusterShuttingDown = 'ClusterShuttingDown'
}

@Injectable({
  providedIn: 'root'
})
export class ClusterEventsService {
  private readonly _events = signal<Map<string, ClusterEvent[]>>(new Map());
  
  readonly events = this._events.asReadonly();

  constructor() {}

  addEvent(endpointUrl: string, eventType: string, member: ClusterMemberDto): void {
    const clusterEvent: ClusterEvent = {
      type: eventType as ClusterEventType,
      timestamp: new Date(),
      member,
      endpointUrl
    };

    this._events.update(eventsMap => {
      const newMap = new Map(eventsMap);
      const existingEvents = newMap.get(endpointUrl) || [];
      const updatedEvents = [...existingEvents, clusterEvent];
      
      // Keep only the last 100 events per endpoint to prevent memory issues
      if (updatedEvents.length > 100) {
        updatedEvents.splice(0, updatedEvents.length - 100);
      }
      
      newMap.set(endpointUrl, updatedEvents);
      return newMap;
    });
  }

  getEventsForEndpoint(endpointUrl: string): ClusterEvent[] {
    return this._events().get(endpointUrl) || [];
  }

  clearEventsForEndpoint(endpointUrl: string): void {
    this._events.update(eventsMap => {
      const newMap = new Map(eventsMap);
      newMap.delete(endpointUrl);
      return newMap;
    });
  }

  clearAllEvents(): void {
    this._events.set(new Map());
  }
} 