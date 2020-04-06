import SimplePeer from "simple-peer";
import * as Y from "yjs";
import { mutex } from "lib0";
import { WebsocketClient } from "lib0/websocket";
import { Observable } from "lib0/observable";

export class WebrtcConn {
  constructor(signalingConn: SignalingConn, initiator: boolean, remotePeerId: string, room: Room): WebrtcConn;
  room: Room;
  remotePeerId: string;
  closed: boolean;
  connected: boolean;
  synced: boolean;
  peer: SimplePeer;
  destroy(): void;
}

export class Room {
  static rooms(): Map<string, Room>;
  constructor(doc: Doc, provider: WebrtcProvider, name: string, key: CryptoKey | null): Room;
  peerId: string;
  doc: Doc;
  /**
   * @todo types
   */
  awareness: any;
  provider: WebrtcProvider;
  synced: boolean;
  name: string;
  key: CryptoKey | null;
  webrtcConns: Map<string, WebrtcConn>;
  bcConns: Set<string>;
  mux: mutex;
  bcconnected: boolean;
  _bcSubscriber: (data: ArrayBuffer) => any;
  _docUpdateHandler: (update: Uint8Array, origin: any) => any;
  _awarenessUpdateHandler: (changed: any, origin: any) => any;
  sendCustomEvent(data: any): void;
  connect(): void;
  disconnect(): void;
  destroy(): void;
}

export class SignalingConn extends WebsocketClient {
  constructor(url: string): SignalingConn;
  providers: Set<WebrtcProvider>;
}

export interface WebrtcProviderOptions {
  signaling: string[];
  password?: string;
  awareness?: any;
  maxConns?: number;
  filterBcConns?: boolean;
  customEventCallback?: Function;
};

export declare class WebrtcProvider extends Observable {
  constructor(name: string, doc: Y.Doc, opts?: WebrtcProviderOptions): WebrtcProvider;
  roomName: string;
  doc: Doc;
  filterBcConns: boolean;
  awareness: any;
  shouldConnect: boolean;
  signalingUrls: string[];
  signalingConns: SignalingConn[];
  maxConns: number;
  key: PromiseLike<CryptoKey | null>;
  room: Room | null;
  connected: boolean;
  connect(): void;
  disconnect(): void;
  destroy(): void;
}