import { defineStore } from 'pinia';

export const usePiniaStore = defineStore({
 id: 'main',
 state: () => ({
  events: []
 }),
 getters: {
  EVENTS: state => state.events
 },
 actions: {
  addEvent(event) {
   this.events.push(event);
  }
 }
});
