export class CriteriaGroup {
  uuid: string;
  description: string;
  checklistId: string;


  constructor(uuid: string, description: string, checklistId: string) {
    this.uuid = uuid;
    this.description = description;
    this.checklistId = checklistId;
  }
}
