export type Action<Type, Payload> = {
  type: Type;
  payload: Payload;
};

export type Debug = {
  isPlaying: boolean;
}
