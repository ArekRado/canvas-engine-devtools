import {
  addEventHandler,
  EventHandler,
  removeEventHandler,
  ECSEvent,
} from '@arekrado/canvas-engine';
import React, { useEffect, useState } from 'react';
import { Input } from '../../common/Input';
import {
  container,
  list,
  preStyle,
  searchInputContainer,
  searchInputLabel,
} from './eventList.css';

export const EventListName = 'EventList';

let eventListBuffer: ECSEvent<string, any>[] = [];

export const EventList: React.FC = () => {
  const [_, setEventListBuffer] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const eventHandler: EventHandler<ECSEvent<string, any>> = ({
      state,
      event,
    }) => {
      eventListBuffer = [...eventListBuffer, event].slice(-50);
      setEventListBuffer(null);
      return state;
    };
    addEventHandler(eventHandler);

    return () => {
      removeEventHandler(eventHandler);
    };
  }, []);

  const filteredList = search
    ? eventListBuffer.filter(({ type }) => type.search(search) !== -1)
    : eventListBuffer;

  return (
    <div className={container}>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        id="search"
        name="search"
        labelClassName={searchInputLabel}
        containerClassName={searchInputContainer}
        label="search"
      />
      <div className={list}>
        {filteredList.map((event, i) => (
          <div key={`${event.type}${i}`}>
            <p>{event.type}</p>
            <pre className={preStyle}>
              <code>{JSON.stringify(event.payload, null, 2)}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};
