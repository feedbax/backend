import type { TTypedDefinitions } from 'nohm';

import type { UserProperties, UserResolved } from '@shared/models/user';
import type { EventProperties } from '@shared/models/event';

import type { EventModel } from '~models/Event';

export type Definitions = TTypedDefinitions<UserProperties>;
export type CreateEvent = (props: EventProperties) => Promise<EventModel>;

export type Resolved = (userUUID: string) => Promise<UserResolved>;

export * from './admin-for';
