import type { Command } from "../classes/command";

export interface Storage<T extends Command> {
  load(hash: string): T;
  store(continuation: T): string;
}
