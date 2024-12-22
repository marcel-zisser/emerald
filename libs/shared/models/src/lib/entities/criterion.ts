export class Criterion {
  uuid: string;
  description: string;
  status: string;
  comments: string;
  groupId: string;


  constructor(uuid: string, description: string, status: string, comments: string, groupId: string) {
    this.uuid = uuid;
    this.description = description;
    this.status = status;
    this.comments = comments;
    this.groupId = groupId;
  }
}
