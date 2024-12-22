
export class Checklist {
  uuid: string;
  title: string;
  description: string;
  ownerId: string;


  constructor(uuid: string, title: string, description: string, ownerId: string) {
    this.uuid = uuid;
    this.title = title;
    this.description = description;
    this.ownerId = ownerId;
  }
}
