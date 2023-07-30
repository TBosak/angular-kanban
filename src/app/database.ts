import Dexie, { Table } from 'dexie';

export interface Column {
  id?: number;
  title?: string;
  titleInput?: boolean;
  cards?: Card[];
}
export interface Card {
  id?: number;
  columnID: number;
  title: string;
  description?: string;
  type?: string;
}

export class AppDB extends Dexie {
  cards!: Table<Card, number>;
  columns!: Table<Column, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(3).stores({
      columns: '++id',
      cards: '++id, columnID',
    });
    this.on('populate', () => this.populate());
  }

  async populate() {
    await db.columns.bulkAdd([
      {title: 'Backlog', cards: []},
      {title: 'In Progress', cards: []},
      {title: 'Testing', cards: []},
      {title: 'Done', cards: []}
    ]);
  }
}

export const db = new AppDB();
