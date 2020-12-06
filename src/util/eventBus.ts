type Event = 'initialize';

type EventBus = {
  on: (event: Event, callback: (data: any) => void) => void;
  dispatch: (event: Event, data: any) => void;
  remove: (event: Event, callback: (data: any) => void) => void;
};

export const eventBus: EventBus = {
  on(event, callback) {
    document.addEventListener(event, (e: any) => callback(e.detail));
  },
  dispatch(event, data) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  remove(event, callback) {
    document.removeEventListener(event, callback);
  },
};
